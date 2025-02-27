/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError)
        {
            return <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-6">
                {/* <h1 className="text-2xl font-bold text-accent-600">Oops!</h1> */}
                <p className="text-xl text-gray-700 mt-4">Something went wrong.</p>
                <p className="text-gray-500 mt-2">Please try refreshing the page or contact support.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 px-6 py-3 bg-accent-600 text-white rounded-lg shadow-md hover:bg-accent-700 transition"
                >
                    Refresh Page
                </button>
            </div>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;