import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { SearchForm } from './components/SearchForm/SearchForm';
import { CardsField } from './components/CardsField/CardsField';
import { CardsPageState } from './type';
import { ApiRarameters } from '../../types/types';
import './CardsPage.css';

import { getCardsData } from '../../api/PokemonApi';

export function CardsPage(): ReactNode {
    const localStorageInputValue = localStorage.getItem('inputValue') || '';

    const [searchValue, setSearchValue] = useState<CardsPageState['searchValue']>(localStorageInputValue);
    const [isDataLoaded, setIsDataLoaded] = useState<CardsPageState['isDataLoaded']>(false);
    const [cardsData, setCardsData] = useState<CardsPageState['cardsData']>({
        data: [],
        page: 0,
        pageSize: 0,
        count: 0,
        totalCount: 0,
    });

    const [pageSizeValue, setPageSizeValue] = useState<CardsPageState['pageSizeValue']>('5');

    const handleValueChange = useCallback((value: string): void => {
        setSearchValue(value);
    }, []);

    const handleSelectValueChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>): void => {
        setPageSizeValue(event.target.value);
    }, []);

    const getDataFromApi = useCallback(async (apiData: ApiRarameters): Promise<void> => {
        try {
            setIsDataLoaded(false);

            const data = await getCardsData(apiData);

            setCardsData(data);
            setIsDataLoaded(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    useEffect(() => {
        const params = {
            name: searchValue,
            pageSize: pageSizeValue,
        };

        getDataFromApi(params);
    }, [getDataFromApi, searchValue, pageSizeValue]);

    return (
        <div className="cards-page">
            <SearchForm onValueChange={handleValueChange} />
            <div className="select_wrapper">
                <span>Number of cards:</span>
                <select name="select-cards" id="select-cards" onChange={handleSelectValueChange}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
            <CardsField cardsData={cardsData} isDataLoaded={isDataLoaded} />
            <div>pagination</div>
        </div>
    );
}
