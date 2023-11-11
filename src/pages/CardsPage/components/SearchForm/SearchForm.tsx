import { ReactNode, useState, useEffect, useCallback } from 'react';
import { SearchFormState } from './type';
import { ErrorButton } from '../../../../components/ErrorButton/ErrorButton';
import { useCardsContext } from '../../../../context/context';
import './SearchForm.css';

export function SearchForm(): ReactNode {
    const { setSearchValue } = useCardsContext()!;

    const localStorageInputValue = localStorage.getItem('inputValue') || '';

    const [inputValue, setInputValue] = useState<SearchFormState['inputValue']>(localStorageInputValue);

    useEffect(() => {
        localStorage.setItem('inputValue', inputValue);
    }, [inputValue]);

    const handleChange = useCallback((event: React.FormEvent<HTMLInputElement>): void => {
        setInputValue((event.target as HTMLInputElement).value);
    }, []);

    const handleSubmit = useCallback(
        (event: React.FormEvent<HTMLFormElement>): void => {
            event.preventDefault();
            setSearchValue(inputValue.trim());
        },
        [setSearchValue, inputValue]
    );

    return (
        <div className="search-wrapper">
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
