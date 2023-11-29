import { ReactNode, useState, useEffect, useCallback } from 'react';
import { setSearchValue } from '../lib/cardsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../types/types';
import styles from '../styles/SearchForm.module.css';

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
        },
        [dispatch, localInputValue]
    );

    return (
        <div className={styles.searchFormWrapper}>
            <form onSubmit={handleSubmit}>
                <label>
                    <input className={styles.searchInput} type="text" value={localInputValue} onChange={handleChange} />
                </label>
                <input className={styles.searchBtn} type="submit" value="Search" />
            </form>
        </div>
    );
}
