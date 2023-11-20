import { CardsPageState } from '../pages/CardsPage/type';

export interface SetSearchValueAction {
    type: 'SET_SEARCH_VALUE';
    payload: string;
}

export interface SetIsDataLoadedAction {
    type: 'SET_IS_DATA_LOADED';
    payload: boolean;
}

export interface SetCardsDataAction {
    type: 'SET_CARDS_DATA';
    payload: CardsPageState['cardsData'];
}

export interface SetPageSizeValueAction {
    type: 'SET_PAGE_SIZE_VALUE';
    payload: string;
}

export interface SetPageNumberValueAction {
    type: 'SET_PAGE_NUMBER_VALUE';
    payload: string;
}

export interface StoreState {
    cards: CardsPageState;
}
