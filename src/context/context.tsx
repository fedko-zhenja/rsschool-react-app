import { createContext, useContext, useState, useCallback, useEffect, useMemo, ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ApiRarameters } from '../types/types';
import { CardsPageState } from '../pages/CardsPage/type';
import { getCardsData } from '../api/PokemonApi';
import { ContextType } from './type';

const CardsContext = createContext<ContextType | null>(null);

export const useCardsContext = () => {
    return useContext(CardsContext);
};

export const CardsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [searchValue, setSearchValue] = useState(localStorage.getItem('inputValue') || '');
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const [cardsData, setCardsData] = useState<CardsPageState['cardsData']>({
        data: [],
        page: 0,
        pageSize: 0,
        count: 0,
        totalCount: 0,
    });

    const [pageSizeValue, setPageSizeValue] = useState('4');
    const [pageNumberValue, setPageNumberValue] = useState(searchParams.get('page') || '1');

    const getDataFromApi = useCallback(
        async (apiData: ApiRarameters) => {
            try {
                setIsDataLoaded(false);

                const data = await getCardsData(apiData);

                setCardsData(data);
                setIsDataLoaded(true);

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

    useEffect(() => {
        localStorage.setItem('inputValue', searchValue);
    }, [searchValue]);

    const value = useMemo(() => {
        return {
            searchValue,
            setSearchValue,
            isDataLoaded,
            setIsDataLoaded,
            cardsData,
            setCardsData,
            pageSizeValue,
            setPageSizeValue,
            pageNumberValue,
            setPageNumberValue,
        };
    }, [
        searchValue,
        setSearchValue,
        isDataLoaded,
        setIsDataLoaded,
        cardsData,
        setCardsData,
        pageSizeValue,
        setPageSizeValue,
        pageNumberValue,
        setPageNumberValue,
    ]);

    return <CardsContext.Provider value={value}>{children}</CardsContext.Provider>;
};
