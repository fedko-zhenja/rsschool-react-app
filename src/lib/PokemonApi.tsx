import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ApiRarameters } from '../types/types';

export const pokemonApi = createApi({
    reducerPath: 'pokemon',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.pokemontcg.io/v2/cards' }),
    endpoints: (buider) => ({
        getCards: buider.query({
            query: ({ name, pageSize, pageNumber }: ApiRarameters) => {
                console.log(4, name, pageSize, pageNumber);
                const paramString = `page=${pageNumber}&pageSize=${pageSize}&select=id,name,abilities,images,hp,attacks`;

                const urlWithSearch = name ? `?q=name:${name}*&${paramString}` : `?${paramString}`;

                return urlWithSearch;
            },
        }),
        getCardById: buider.query({
            query: (id: string) => {
                const urlWithSearch = `/${id}`;

                return urlWithSearch;
            },
        }),
    }),
});

export const { useGetCardsQuery, useGetCardByIdQuery } = pokemonApi;
