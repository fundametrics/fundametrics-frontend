import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-[400px] flex items-center justify-center p-6">
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-md w-full text-center">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-red-50 rounded-2xl">
                                <AlertCircle className="text-red-600" size={32} />
                            </div>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase mb-2">Something went wrong</h2>
                        <p className="text-slate-500 text-sm mb-8">
                            An unexpected error occurred while rendering this component.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full py-4 bg-indigo-600 hover:bg-slate-900 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
                        >
                            <RefreshCcw size={16} />
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
