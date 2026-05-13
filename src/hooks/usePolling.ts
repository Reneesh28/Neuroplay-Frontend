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

    const [isStale, setIsStale] = useState(false);
    const lastDataRef = useRef<string>("");
    const sameDataCountRef = useRef(0);

    const STALE_THRESHOLD = 50; // Flag as stale if no changes in 50 attempts

    const stopPolling = useCallback(() => {
        setIsPolling(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }, []);

    const poll = useCallback(async () => {
        if (!isMounted.current) return;

        try {
            const result = await fetchFn();

            if (!isMounted.current) return;

            // 🔥 Stale detection logic
            const currentDataStr = JSON.stringify(result);
            if (currentDataStr === lastDataRef.current) {
                sameDataCountRef.current += 1;
            } else {
                sameDataCountRef.current = 0;
                lastDataRef.current = currentDataStr;
                setIsStale(false);
            }

            if (sameDataCountRef.current >= STALE_THRESHOLD) {
                setIsStale(true);
            }

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
                const timeoutError = new Error('TIMEOUT');
                setError(timeoutError);
                onError?.(timeoutError);
                return;
            }

            timeoutRef.current = setTimeout(poll, interval);
        } catch (err) {
            if (!isMounted.current) return;
            
            // Classify error
            const classifiedError = (err as any).error?.code === 'NETWORK_ERROR' ? new Error('NETWORK') : err;
            
            setError(classifiedError);
            stopPolling();
            onError?.(classifiedError);
        }
    }, [fetchFn, shouldStop, interval, maxAttempts, onSuccess, onError, stopPolling]);

    const startPolling = useCallback(() => {
        setAttempts(0);
        attemptsRef.current = 0;
        sameDataCountRef.current = 0;
        lastDataRef.current = "";
        setIsPolling(true);
        setIsStale(false);
        setData(null);
        setError(null);
        poll();
    }, [poll]);

    return {
        data,
        error,
        isPolling,
        isStale,
        attempts,
        startPolling,
        stopPolling,
    };
}
