import { createSlice } from '@reduxjs/toolkit';
import { countryData } from '../data/countryData';

const initialState = {
    countryNames: countryData,
    country: '',
    name: '',
    age: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAgreeTerms: false,
};

export const firstFormSlice = createSlice({
    name: 'firstForm',
    initialState,
    reducers: {
        setCountry: (state, action) => {
            state.country = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setAge: (state, action) => {
            state.age = action.payload;
        },
        setGender: (state, action) => {
            state.gender = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload;
        },
        setIsAgreeTerms: (state, action) => {
            state.isAgreeTerms = action.payload;
        },
    },
});

export const { setCountry } = firstFormSlice.actions;
