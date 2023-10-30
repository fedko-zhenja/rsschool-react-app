import React from 'react';
import { ErrorBoundaryState, ErrorBoundaryProps } from '../../../types/types';
import './ErrorBoundary.css';

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    reloadPage = () => {
        location.reload();
    };

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            return (
                <div className="error-wrapper">
                    <h3>Something went wrong... Reload the page!</h3>
                    <button className="reload-page_btn" onClick={this.reloadPage}>
                        Reload page
                    </button>
                    <div className="error-image" />
                </div>
            );
        }

        return children;
    }
}
