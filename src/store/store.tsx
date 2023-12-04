import { configureStore } from '@reduxjs/toolkit';
import { firstFormSlice, historySlice } from './reducer';
import { setupListeners } from '@reduxjs/toolkit/query';

export const firstFormStore = configureStore({
    reducer: {
        firstForm: firstFormSlice.reducer,
        history: historySlice.reducer,
    },
});

setupListeners(firstFormStore.dispatch);
