import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './cardsReducer';

export const store = configureStore({
    reducer: {
        cards: cardsReducer,
    },
});
console.log(1, store.getState());
