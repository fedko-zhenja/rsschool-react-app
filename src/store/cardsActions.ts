import { CardsPageState } from '../pages/CardsPage/type';
// import {
//     SetSearchValueAction,
//     SetIsDataLoadedAction,
//     SetCardsDataAction,
//     SetPageSizeValueAction,
//     SetPageNumberValueAction,
// } from './type';

// export const setSearchValue = (searchValue: string): SetSearchValueAction => ({
//     type: 'SET_SEARCH_VALUE',
//     payload: searchValue,
// });

// export const setIsDataLoaded = (isDataLoaded: boolean): SetIsDataLoadedAction => ({
//     type: 'SET_IS_DATA_LOADED',
//     payload: isDataLoaded,
// });

// export const setCardsData = (cardsData: CardsPageState['cardsData']): SetCardsDataAction => ({
//     type: 'SET_CARDS_DATA',
//     payload: cardsData,
// });

// export const setPageSizeValue = (pageSizeValue: string): SetPageSizeValueAction => ({
//     type: 'SET_PAGE_SIZE_VALUE',
//     payload: pageSizeValue,
// });

// export const setPageNumberValue = (pageNumberValue: string): SetPageNumberValueAction => ({
//     type: 'SET_PAGE_NUMBER_VALUE',
//     payload: pageNumberValue,
// });

export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
export const SET_IS_DATA_LOADED = 'SET_IS_DATA_LOADED';
export const SET_CARDS_DATA = 'SET_CARDS_DATA';
export const SET_PAGE_SIZE_VALUE = 'SET_PAGE_SIZE_VALUE';
export const SET_PAGE_NUMBER_VALUE = 'SET_PAGE_NUMBER_VALUE';

export const setSearchValue = (value: string) => ({
    type: SET_SEARCH_VALUE,
    payload: value,
});

export const setIsDataLoaded = (value: boolean) => ({
    type: SET_IS_DATA_LOADED,
    payload: value,
});

export const setCardsData = (data: CardsPageState['cardsData']) => ({
    type: SET_CARDS_DATA,
    payload: data,
});

export const setPageSizeValue = (value: string) => ({
    type: SET_PAGE_SIZE_VALUE,
    payload: value,
});

export const setPageNumberValue = (value: string) => ({
    type: SET_PAGE_NUMBER_VALUE,
    payload: value,
});
