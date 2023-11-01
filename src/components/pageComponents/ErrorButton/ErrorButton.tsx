import { ErrorButtonState } from '../../../types/types';
import { ReactNode, useState } from 'react';
import './ErrorButton.css';

export function ErrorButton(): ReactNode {
    const [hasError, setHasError] = useState<ErrorButtonState['hasError']>(false);

    const handleClick = () => {
        setHasError(true);
    };

    if (hasError) {
        throw new Error('Create Error');
    }

    return (
        <div>
            <input className="error_btn" type="button" value="Error" onClick={handleClick} />
        </div>
    );
}
