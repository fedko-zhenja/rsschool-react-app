import { ReactNode, useCallback } from 'react';
import { SearchForm } from './components/SearchForm/SearchForm';
import { CardsField } from './components/CardsField/CardsField';
import { Pagination } from './components/Pagination/Pagination';
import './CardsPage.css';

import { Outlet } from 'react-router-dom';

import { useCardsContext } from '../../context/context';

export function CardsPage(): ReactNode {
    // const { setPageSizeValue, setPageNumberValue } = useCardsContext()!;

    const context = useCardsContext();

    const setPageSizeValue = context ? context.setPageSizeValue : () => {};

    const setPageNumberValue = context ? context.setPageNumberValue : () => {};

    const handleSelectValueChange = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            setPageSizeValue(event.target.value);
            setPageNumberValue('1');
        },
        [setPageSizeValue, setPageNumberValue]
    );

    return (
        <div className="cards-page">
            <SearchForm />
            <div className="page-content-wrapper">
                <div className="page-content_card-wrapper">
                    <div className="select_wrapper">
                        <span>Number of cards:</span>
                        <select name="select-cards" id="select-cards" onChange={handleSelectValueChange}>
                            <option value="4">4</option>
                            <option value="8">8</option>
                            <option value="12">12</option>
                            <option value="16">16</option>
                        </select>
                    </div>
                    <CardsField />
                    <Pagination />
                </div>
                <Outlet />
            </div>
        </div>
    );
}
