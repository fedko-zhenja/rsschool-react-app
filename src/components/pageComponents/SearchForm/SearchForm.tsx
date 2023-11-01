import { ReactNode, useState, useEffect } from 'react';
import { SearchFormProps, SearchFormState } from '../../../types/types';
import { ErrorButton } from '../ErrorButton/ErrorButton';
import './SearchForm.css';

export function SearchForm({ title, onValueChange }: SearchFormProps): ReactNode {
    const localStorageInputValue = localStorage.getItem('inputValue') || '';

    const [inputValue, setInputValue] = useState<SearchFormState['inputValue']>(localStorageInputValue);

    useEffect(() => {
        localStorage.setItem('inputValue', inputValue);
    }, [inputValue]);

    const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
        setInputValue((event.target as HTMLInputElement).value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        onValueChange(inputValue.trim());
    };

    return (
        <div className="search-wrapper">
            <h1>{title}</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <input className="search_input" type="text" value={inputValue} onChange={handleChange} />
                </label>
                <input className="search_btn" type="submit" value="Search" />
            </form>
            <ErrorButton />
        </div>
    );
}
