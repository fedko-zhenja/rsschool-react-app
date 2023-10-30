import React, { ReactNode } from 'react';
import { ErrorBoundaryState, ErrorBoundaryProps } from '../../../types/types';
import './ErrorBoundary.css';

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    reloadPage = (): void => {
        location.reload();
    };

    render(): ReactNode {
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
