import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type ToastType = 'info' | 'success' | 'warning' | 'error';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    addToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: ToastType) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed top-4 right-4 z-[9999] space-y-3 pointer-events-none w-full max-w-sm">
                {toasts.map((toast) => (
                    <div 
                        key={toast.id}
                        className="pointer-events-auto p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in border transition-all duration-300"
                        style={{
                            background: 'var(--bg-elevated)',
                            borderColor: 'var(--border)',
                            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
                        }}
                    >
                        <div className="text-lg">
                            {toast.type === 'success' && '✅'}
                            {toast.type === 'error' && '❌'}
                            {toast.type === 'warning' && '⚠️'}
                            {toast.type === 'info' && 'ℹ️'}
                        </div>
                        <p className="text-sm font-semibold" style={{ color: 'var(--text-heading)' }}>
                            {toast.message}
                        </p>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within ToastProvider');
    return context;
};
