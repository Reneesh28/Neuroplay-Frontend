import React, { type ReactNode } from 'react';

interface PageContainerProps {
    children: ReactNode;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
    className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ 
    children, 
    maxWidth = '5xl',
    className = ''
}) => {
    return (
        <main className={`flex-1 px-4 sm:px-6 py-8 md:py-12 w-full animate-fade-in ${className}`}>
            <div className={`mx-auto max-w-${maxWidth} w-full`}>
                {children}
            </div>
        </main>
    );
};
