import React from 'react';
import { ErrorButtonState } from '../../../types/types';
import './ErrorButton.css';

export class ErrorButton extends React.Component<object, ErrorButtonState> {
    constructor(props: object) {
        super(props);

        this.state = {
            hasError: false,
        };
    }

    handleClick = () => {
        this.setState({ hasError: true });
    };

    render() {
        const { hasError } = this.state;

        if (hasError) {
            throw new Error('Create Error');
        }

        return (
            <div>
                <input className="error_btn" type="button" value="Error" onClick={this.handleClick} />
            </div>
        );
    }
}
