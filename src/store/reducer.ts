import { createSlice } from '@reduxjs/toolkit';
import { countryData } from '../data/countryData';

const initialState = {
    countryNames: countryData,
    country: '',
};

export const firstFormSlice = createSlice({
    name: 'firstForm',
    initialState,
    reducers: {
        setCountry: (state, action) => {
            state.country = action.payload;
        },
    },
});

export const { setCountry } = firstFormSlice.actions;
