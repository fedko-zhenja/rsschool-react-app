import { ReactNode, useCallback, useEffect } from 'react';
import { SearchForm } from './components/SearchForm/SearchForm';
import { CardsField } from './components/CardsField/CardsField';
import { Pagination } from './components/Pagination/Pagination';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPageSizeValue, setPageNumberValue, setIsDataLoaded, setCardsData } from '../../store/cardsReducer';
import { ApiRarameters } from '../../types/types';
import { StoreState } from '../../store/type';
import { useGetCardsQuery } from '../../api/PokemonApi';
import './CardsPage.css';

export function CardsPage(): ReactNode {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const reduxPageSizeValue = useSelector((state: StoreState) => state.cards.pageSizeValue);
    const reduxPageNumberValue = useSelector((state: StoreState) => state.cards.pageNumberValue);
    const reduxInputValue = useSelector((state: StoreState) => state.cards.searchValue);

    const handleSelectValueChange = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch(setPageSizeValue(event.target.value));
            dispatch(setPageNumberValue('1'));
        },
        [dispatch]
    );

    const { data } = useGetCardsQuery({
        name: reduxInputValue,
        pageSize: reduxPageSizeValue,
        pageNumber: reduxPageNumberValue,
    });

    useEffect(() => {
        dispatch(setCardsData(data));
        dispatch(setIsDataLoaded(true));
    }, [data, dispatch, navigate]);

    const getDataFromApi = useCallback(
        (apiData: ApiRarameters) => {
            dispatch(setIsDataLoaded(false));

            const newSearchParams = new URLSearchParams(window.location.search);
            newSearchParams.set('page', apiData.pageNumber);
            navigate(`${window.location.pathname}?${newSearchParams.toString()}`);
        },
        [navigate, dispatch]
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
