import React from 'react';
import { SearchFormProps, SearchFormState } from '../../../types/types';
import './SearchForm.css';

export class SearchForm extends React.Component<SearchFormProps, SearchFormState> {
    constructor(props: SearchFormProps) {
        super(props);

        const localStorageInputValue = localStorage.getItem('inputValue') || '';

        this.state = { value: localStorageInputValue };
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
        if (event.target) {
            this.setState({ value: (event.target as HTMLInputElement).value });
            console.log(this.state);
        }
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        if (this.state.value !== '') {
            console.log(this.state.value);
        }

        localStorage.setItem('inputValue', this.state.value);

        event.preventDefault();
    };

    render(): React.ReactNode {
        return (
            <div className="search-wrapper">
                <h1>{this.props.title}</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input
                            className="search_input"
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </label>
                    <input className="search_btn" type="submit" value="Search" />
                </form>
            </div>
        );
    }
}
