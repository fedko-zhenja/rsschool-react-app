import { ErrorButtonState } from './type';
import { ReactNode, useCallback, useState } from 'react';
import styles from './ErrorButton.module.css';

export function ErrorButton(): ReactNode {
    const [hasError, setHasError] = useState<ErrorButtonState['hasError']>(false);

    const handleClick = useCallback((): void => {
        setHasError(true);
    }, []);

    if (hasError) {
        throw new Error('Create Error');
    }

    return (
        <div>
            <input className={styles.errorBtn} type="button" value="Error" onClick={handleClick} />
        </div>
    );
}
