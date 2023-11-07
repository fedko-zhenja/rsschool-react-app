import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SearchForm } from './components/SearchForm/SearchForm';
import { CardsField } from './components/CardsField/CardsField';
import { CardsPageState } from './type';
import { ApiRarameters } from '../../types/types';
import { Pagination } from './components/Pagination/Pagination';
import './CardsPage.css';

import { Outlet } from 'react-router-dom';

import { getCardsData } from '../../api/PokemonApi';

export function CardsPage(): ReactNode {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

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
    const [pageNumberValue, setPageNumberValue] = useState<CardsPageState['pageNumberValue']>(
        searchParams.get('page') || '1'
    );

    const handleValueChange = useCallback((value: string): void => {
        setSearchValue(value);
    }, []);

    const handlePageNumberValueChange = useCallback((value: string): void => {
        setPageNumberValue(value);
    }, []);

    const handleSelectValueChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>): void => {
        setPageSizeValue(event.target.value);
        setPageNumberValue('1');
    }, []);

    const getDataFromApi = useCallback(
        async (apiData: ApiRarameters): Promise<void> => {
            try {
                setIsDataLoaded(false);

                const data = await getCardsData(apiData);

                setCardsData(data);
                setIsDataLoaded(true);

                // NOTE: I don't use searchParams because it has a bug https://github.com/remix-run/react-router/issues/9991
                const newSearchParams = new URLSearchParams(window.location.search);
                newSearchParams.set('page', apiData.pageNumber);
                navigate(`${window.location.pathname}?${newSearchParams.toString()}`);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        [navigate]
    );

    useEffect(() => {
        const params = {
            name: searchValue,
            pageSize: pageSizeValue,
            pageNumber: pageNumberValue,
        };

        getDataFromApi(params);
    }, [searchValue, pageSizeValue, pageNumberValue, getDataFromApi]);

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
                        pageNumber={Number(pageNumberValue)}
                        totalPages={Math.ceil(cardsData.totalCount / Number(pageSizeValue))}
                        onPageNumberChange={handlePageNumberValueChange}
                    />
                </div>
                <Outlet />
            </div>
        </div>
    );
}
