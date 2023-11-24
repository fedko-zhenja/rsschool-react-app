import React, { ReactNode, useState, useEffect } from 'react';
import styles from './ErrorBoundary.module.css';

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
            <div className={styles.errorWrapper}>
                <h3>Something went wrong... Reload the page!</h3>
                <button className={styles.reloadPageBtn} onClick={reloadPage}>
                    Reload page
                </button>
                <div className={styles.errorImage} />
            </div>
        );
    }

    return <div>{children}</div>;
};
