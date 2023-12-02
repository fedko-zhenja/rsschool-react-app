import { configureStore } from '@reduxjs/toolkit';
import { firstFormSlice } from './reducer';
import { setupListeners } from '@reduxjs/toolkit/query';

export const firstFormStore = configureStore({
    reducer: {
        firstForm: firstFormSlice.reducer,
    },
});

setupListeners(firstFormStore.dispatch);
