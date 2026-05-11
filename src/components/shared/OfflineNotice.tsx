import React, { useEffect, useState } from 'react';

export const OfflineNotice: React.FC = () => {
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (!isOffline) return null;

    return (
        <div 
            className="fixed bottom-6 right-6 z-[100] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-fade-up overflow-hidden"
            style={{
                background: 'var(--bg-elevated)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                boxShadow: '0 12px 48px -12px rgba(0,0,0,0.5)',
            }}
        >
            {/* Pulsing red dot */}
            <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </div>

            <div className="space-y-0.5">
                <p className="text-sm font-black uppercase tracking-tight" style={{ color: 'var(--text-heading)' }}>
                    System Link Severed
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                    Entering local fallback mode...
                </p>
            </div>
            
            <div className="h-8 w-px bg-white/5 ml-2" />
            
            <span className="text-xs font-mono opacity-30">DISCON_0x22</span>
        </div>
    );
};
