import { useState, useEffect, useRef, useCallback } from 'react';

interface PollingOptions<T> {
    fetchFn: () => Promise<T>;
    shouldStop: (data: T) => boolean;
    interval?: number;
    maxAttempts?: number;
    onSuccess?: (data: T) => void;
    onError?: (error: any) => void;
}

export function usePolling<T>({
    fetchFn,
    shouldStop,
    interval = 3000,
    maxAttempts = 200,
    onSuccess,
    onError,
}: PollingOptions<T>) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<any>(null);
    const [isPolling, setIsPolling] = useState(false);
    const [attempts, setAttempts] = useState(0);

    const isMounted = useRef(true);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const attemptsRef = useRef(0);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const stopPolling = useCallback(() => {
        setIsPolling(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }, []);

    const poll = useCallback(async () => {
        if (!isMounted.current) return;

        try {
            const result = await fetchFn();

            if (!isMounted.current) return;

            setData(result);
            setError(null);

            if (shouldStop(result)) {
                stopPolling();
                onSuccess?.(result);
                return;
            }

            attemptsRef.current += 1;
            setAttempts(attemptsRef.current);

            if (attemptsRef.current >= maxAttempts) {
                stopPolling();
                const timeoutError = new Error('Polling timeout: max attempts reached');
                setError(timeoutError);
                onError?.(timeoutError);
                return;
            }

            timeoutRef.current = setTimeout(poll, interval);
        } catch (err) {
            if (!isMounted.current) return;
            setError(err);
            stopPolling();
            onError?.(err);
        }
    }, [fetchFn, shouldStop, interval, maxAttempts, onSuccess, onError, stopPolling]);

    const startPolling = useCallback(() => {
        setAttempts(0);
        attemptsRef.current = 0;
        setIsPolling(true);
        setData(null);
        setError(null);
        poll();
    }, [poll]);

    return {
        data,
        error,
        isPolling,
        attempts,
        startPolling,
        stopPolling,
    };
}
