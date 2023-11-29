import { ReactNode, useCallback, useEffect } from 'react';
import { SearchForm } from '../components/SearchForm';
import { CardsField } from './CardsField';
import { Pagination } from './Pagination';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setPageSizeValue, setPageNumberValue, setIsDataLoaded, setCardsData } from '../lib/cardsReducer';
import { ApiRarameters } from '../types/types';
import { StoreState } from '../types/types';
import { useGetCardsQuery } from '../lib/PokemonApi';
import styles from '../styles/CardsPage.module.css';
import { CardsPageProps } from '../types/types';
import { AdditionalCardsInfo } from './AdditionalCardsInfo';
import { useSearchParams } from 'next/navigation';

function CardsPage({ initialData }: CardsPageProps): ReactNode {
    const searchParams = useSearchParams();

    const router = useRouter();
    const dispatch = useDispatch();
    const reduxPageSizeValue = useSelector((state: StoreState) => state.cards.pageSizeValue);
    const reduxPageNumberValue = useSelector((state: StoreState) => state.cards.pageNumberValue);
    const reduxInputValue = useSelector((state: StoreState) => state.cards.searchValue);

    useEffect(() => {
        if (initialData) {
            dispatch(setCardsData(initialData));
            dispatch(setIsDataLoaded(true));
        }
    }, [initialData, dispatch]);

    const handleSelectValueChange = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch(setPageSizeValue(event.target.value));
            dispatch(setPageNumberValue('1'));
        },
        [dispatch]
    );

    const { data, isFetching, refetch } = useGetCardsQuery({
        name: reduxInputValue,
        pageSize: reduxPageSizeValue,
        pageNumber: reduxPageNumberValue,
    });

    useEffect(() => {
        if (data && !isFetching) {
            dispatch(setCardsData(data));
            dispatch(setIsDataLoaded(true));
        }
    }, [data, dispatch, isFetching]);

    const getDataFromApi = useCallback(
        (apiData: ApiRarameters) => {
            dispatch(setIsDataLoaded(false));

            const currentPageNumber = Number(router.query.page) || 1;
            const newPageNumber = Number(apiData.pageNumber);

            if (currentPageNumber !== newPageNumber) {
                router.push(
                    {
                        pathname: router.pathname,
                        query: { ...router.query, page: newPageNumber },
                    },
                    undefined,
                    { shallow: true }
                );
            }
            refetch();
        },
        [dispatch, router, refetch]
    );

    useEffect(() => {
        const params = {
            name: reduxInputValue,
            pageSize: reduxPageSizeValue,
            pageNumber: reduxPageNumberValue,
        };

        getDataFromApi(params);
    }, [reduxInputValue, reduxPageSizeValue, reduxPageNumberValue, getDataFromApi]);

    useEffect(() => {
        localStorage.setItem('inputValue', reduxInputValue);
    }, [reduxInputValue]);

    return (
        <div className={styles.cardsPage}>
            <SearchForm />
            <div className={styles.pageContentWrapper}>
                <div className={styles.pageContentCardWrapper}>
                    <div className={styles.selectWrapper}>
                        <span>Number of cards:</span>
                        <select
                            name="select-cards"
                            id="select-cards"
                            data-testid="select"
                            onChange={handleSelectValueChange}
                        >
                            <option value="4">4</option>
                            <option value="8">8</option>
                            <option value="12">12</option>
                            <option value="16">16</option>
                        </select>
                    </div>
                    <CardsField />
                    <Pagination />
                </div>
                {searchParams.get('details') && <AdditionalCardsInfo />}
            </div>
        </div>
    );
}

export default CardsPage;
