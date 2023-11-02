import { ReactNode, useCallback, useEffect, useState } from 'react';
import { SearchForm } from '../../pageComponents/SearchForm/SearchForm';
import { CardsField } from '../../pageComponents/CardsField/CardsField';
import { CardsPageState } from '../../../types/types';
import './CardsPage.css';

import { getCardsData } from '../../../api/PokemonApi';

export function CardsPage(): ReactNode {
    const localStorageInputValue = localStorage.getItem('inputValue') || '';

    const [inputValue, setInputValue] = useState<CardsPageState['inputValue']>(localStorageInputValue);
    const [isDataLoaded, setIsDataLoaded] = useState<CardsPageState['isDataLoaded']>(false);
    const [cardsData, setCardsData] = useState<CardsPageState['cardsData']>({
        data: [],
        page: 0,
        pageSize: 0,
        count: 0,
        totalCount: 0,
    });

    const handleValueChange = useCallback((value: string): void => {
        setInputValue(value);
    }, []);

    const getDataFromApi = useCallback(async (value: string): Promise<void> => {
        try {
            setIsDataLoaded(false);

            let data = null;

            if (value === '') {
                data = await getCardsData();
            } else {
                data = await getCardsData(value);
            }

            setCardsData(data);
            setIsDataLoaded(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    useEffect(() => {
        getDataFromApi(inputValue);
    }, [getDataFromApi, inputValue]);

    return (
        <div className="cards-page">
            <SearchForm onValueChange={handleValueChange} />
            <CardsField cardsData={cardsData} isDataLoaded={isDataLoaded} />
        </div>
    );
}
