import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchForm } from './components/SearchForm/SearchForm';
import { CardsField } from './components/CardsField/CardsField';
import { CardsPageState } from './type';
import { ApiRarameters } from '../../types/types';
import { Pagination } from './components/Pagination/Pagination';
import './CardsPage.css';

import { Outlet } from 'react-router-dom';

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

    const [pageSizeValue, setPageSizeValue] = useState<CardsPageState['pageSizeValue']>('4');
    const [pageNumberValue, setPageNumberValue] = useState<CardsPageState['pageNumberValue']>('1');

    const [searchParams] = useSearchParams();

    const handleValueChange = useCallback((value: string): void => {
        setSearchValue(value);
    }, []);

    const handlePageNumberValueChange = useCallback((value: string): void => {
        setPageNumberValue(value);
    }, []);

    const handleSelectValueChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>): void => {
        setPageSizeValue(event.target.value);
    }, []);

    const getDataFromApi = useCallback(
        async (apiData: ApiRarameters): Promise<void> => {
            try {
                setIsDataLoaded(false);

                const data = await getCardsData(apiData);

                setCardsData(data);
                setIsDataLoaded(true);

                const newSearchParams = new URLSearchParams(searchParams.toString());
                newSearchParams.set('page', apiData.pageNumber);
                window.history.replaceState(null, '', `?${newSearchParams.toString()}`);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        [searchParams]
    );

    useEffect(() => {
        const params = {
            name: searchValue,
            pageSize: pageSizeValue,
            pageNumber: pageNumberValue,
        };

        getDataFromApi(params);
    }, [getDataFromApi, searchValue, pageSizeValue, pageNumberValue]);

    return (
        <div className="cards-page">
            <SearchForm onValueChange={handleValueChange} />
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
                    <CardsField cardsData={cardsData} isDataLoaded={isDataLoaded} />
                    <Pagination
                        pageSize={pageSizeValue}
                        totalCount={cardsData.totalCount}
                        onPageNumberChange={handlePageNumberValueChange}
                    />
                </div>
                <Outlet />
            </div>
        </div>
    );
}
