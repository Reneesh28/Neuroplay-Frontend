import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SessionState {
    userId: string;
    gameId: string;
    token: string | null;
    role: 'user' | 'admin';
    setSession: (userId: string, gameId: string, token: string | null, role?: 'user' | 'admin') => void;
    clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(
    persist(
        (set) => ({
            userId: 'demo-user', // Default to demo-user initially
            gameId: 'bo6',
            token: null,
            role: 'user',
            setSession: (userId, gameId, token, role = 'user') => set({ userId, gameId, token, role }),
            clearSession: () => set({ userId: 'demo-user', gameId: 'bo6', token: null, role: 'user' }),
        }),
        {
            name: 'neuroplay-session',
        }
    )
);
