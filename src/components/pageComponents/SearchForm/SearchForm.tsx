import React from 'react';
import { SearchFormProps, SearchFormState } from '../../../types/types';
import { ErrorButton } from '../ErrorButton/ErrorButton';
import './SearchForm.css';

export class SearchForm extends React.Component<SearchFormProps, SearchFormState> {
    constructor(props: SearchFormProps) {
        super(props);

        const localStorageInputValue = localStorage.getItem('inputValue') || '';

        this.state = { inputValue: localStorageInputValue };
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
        if (event.target) {
            this.setState({ inputValue: (event.target as HTMLInputElement).value });
        }
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        const inputValue = this.state.inputValue.trim();

        localStorage.setItem('inputValue', inputValue);
        event.preventDefault();
        this.props.onValueChange(inputValue);
    };

    render(): React.ReactNode {
        const { inputValue } = this.state;
        const { title } = this.props;

        return (
            <div className="search-wrapper">
                <h1>{title}</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input className="search_input" type="text" value={inputValue} onChange={this.handleChange} />
                    </label>
                    <input className="search_btn" type="submit" value="Search" />
                </form>
                <ErrorButton />
            </div>
        );
    }
}
