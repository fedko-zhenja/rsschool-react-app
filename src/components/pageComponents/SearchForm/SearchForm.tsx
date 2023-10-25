import React from 'react';
import { SearchFormProps, SearchFormState } from '../../../types/types';

export class SearchForm extends React.Component<
    SearchFormProps,
    SearchFormState
> {
    constructor(props: SearchFormProps) {
        super(props);

        this.state = { value: '' };
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
        event.preventDefault();
    };

    render(): React.ReactNode {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </label>
                    <input type="submit" value="submit" />
                </form>
            </div>
        );
    }
}
