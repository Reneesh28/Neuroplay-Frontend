import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error in component tree:', error, errorInfo);
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: null });
        // Optionally reload the page or navigate home
        window.location.href = '/';
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                    <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4"
                        style={{
                            background: 'rgba(239,68,68,0.1)',
                            border: '1px solid rgba(239,68,68,0.3)',
                        }}
                    >
                        ⚠️
                    </div>
                    <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-heading)' }}>
                        System Encountered an Error
                    </h2>
                    <p className="text-sm max-w-md mb-6" style={{ color: 'var(--text-secondary)' }}>
                        {this.state.error?.message || "An unexpected rendering error occurred in the UI layer."}
                    </p>
                    <button 
                        onClick={this.handleReset}
                        className="btn btn-primary"
                        style={{ padding: '10px 24px' }}
                    >
                        Return Home
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
