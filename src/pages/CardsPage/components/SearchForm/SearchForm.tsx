import { ReactNode, useState, useEffect, useCallback } from 'react';
import { ErrorButton } from '../../../../components/ErrorButton/ErrorButton';
import { setSearchValue } from '../../../../store/cardsReducer';
import { useDispatch, useSelector } from 'react-redux';
import './SearchForm.css';
// import { CardsPageState } from '../../type';
import { StoreState } from '../../../../store/type';

import { store } from '../../../../store/store';
export function SearchForm(): ReactNode {
    const dispatch = useDispatch();
    const reduxInputValue = useSelector((state: StoreState) => state.cards.searchValue);

    const [localInputValue, setLocalInputValue] = useState(reduxInputValue || '');

    useEffect(() => {
        localStorage.setItem('inputValue', localInputValue);
    }, [localInputValue]);

    const handleChange = useCallback((event: React.FormEvent<HTMLInputElement>): void => {
        const value = (event.target as HTMLInputElement).value;
        setLocalInputValue(value);
    }, []);

    const handleSubmit = useCallback(
        (event: React.FormEvent<HTMLFormElement>): void => {
            event.preventDefault();
            const inputValueToSubmit = localInputValue.trim();
            dispatch(setSearchValue(inputValueToSubmit));
            console.log(2, store.getState());
        },
        [dispatch, localInputValue]
    );

    return (
        <div className="search-wrapper">
            <form onSubmit={handleSubmit}>
                <label>
                    <input className="search_input" type="text" value={localInputValue} onChange={handleChange} />
                </label>
                <input className="search_btn" type="submit" value="Search" />
            </form>
            <ErrorButton />
        </div>
    );
}
