import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './cardsReducer';
import { setupListeners } from '@reduxjs/toolkit/query';
import { pokemonApi } from './PokemonApi';

export const store = configureStore({
    reducer: {
        cards: cardsReducer,
        [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(pokemonApi.middleware);
    },
});

setupListeners(store.dispatch);
