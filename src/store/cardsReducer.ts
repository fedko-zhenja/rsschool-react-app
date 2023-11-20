import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchValue: localStorage.getItem('inputValue') || '',
    isDataLoaded: false,
    cardsData: {
        data: [],
        page: 0,
        pageSize: 0,
        count: 0,
        totalCount: 0,
    },
    pageSizeValue: '4',
    pageNumberValue: '1',
};

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
        setIsDataLoaded: (state, action) => {
            state.isDataLoaded = action.payload;
        },
        setCardsData: (state, action) => {
            state.cardsData = action.payload;
        },
        setPageSizeValue: (state, action) => {
            state.pageSizeValue = action.payload;
        },
        setPageNumberValue: (state, action) => {
            state.pageNumberValue = action.payload;
        },
    },
});

export const { setSearchValue, setIsDataLoaded, setCardsData, setPageSizeValue, setPageNumberValue } =
    cardsSlice.actions;

export default cardsSlice.reducer;
