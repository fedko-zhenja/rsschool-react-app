import React, { ReactNode, useState, useEffect } from 'react';
import './ErrorBoundary.css';

interface ErrorBoundaryProps {
    children?: ReactNode;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    const reloadPage = (): void => {
        location.reload();
    };

    useEffect(() => {
        const handleError = () => {
            setHasError(true);
        };

        window.addEventListener('error', handleError);

        return () => {
            window.removeEventListener('error', handleError);
        };
    }, []);

    if (hasError) {
        return (
            <div className="error-wrapper">
                <h3>Something went wrong... Reload the page!</h3>
                <button className="reload-page_btn" onClick={reloadPage}>
                    Reload page
                </button>
                <div className="error-image" />
            </div>
        );
    }

    return <div>{children}</div>;
};
