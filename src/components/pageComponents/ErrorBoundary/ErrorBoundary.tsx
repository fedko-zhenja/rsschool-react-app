import React from 'react';
import { ErrorBoundaryState } from '../../../types/types';

export class ErrorBoundary extends React.Component<object, ErrorBoundaryState> {
    constructor(props: object) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error, errorInfo: React.ErrorInfo) {
        console.error(error, errorInfo);
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <div>Something went wrong... Reload the page!</div>;
        }
    }
}
