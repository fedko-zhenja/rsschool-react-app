import { createSlice } from '@reduxjs/toolkit';
import { countryData } from '../data/countryData';
import { FirstFormState } from './types';

const initialState = {
    countryNames: countryData,
    country: '',
    name: '',
    age: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAcceptTCRef: false,
    isDataLoaded: false,
    picture: '',
};

export const firstFormSlice = createSlice({
    name: 'firstForm',
    initialState,
    reducers: {
        setCountry: (state, action) => {
            state.country = action.payload;
        },
        setName: (state, action) => {
            console.log('store', action.payload);
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
        setIsAcceptTCRef: (state, action) => {
            state.isAcceptTCRef = action.payload;
        },
        setIsDataLoaded: (state, action) => {
            state.isDataLoaded = action.payload;
        },
        setPicture: (state, action) => {
            state.picture = action.payload;
        },
    },
});

export const {
    setCountry,
    setName,
    setAge,
    setGender,
    setEmail,
    setPassword,
    setIsAcceptTCRef,
    setIsDataLoaded,
    setPicture,
} = firstFormSlice.actions;

export const historySlice = createSlice({
    name: 'history',
    initialState: [] as Array<FirstFormState>,
    reducers: {
        setDataToHistory: (state, action) => {
            state.push(action.payload);
        },
    },
});

export const { setDataToHistory } = historySlice.actions;
