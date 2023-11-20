// import { PokemonCard, ApiRarameters } from '../types/types';
// import { CardData } from '../types/types';

// const path = 'https://api.pokemontcg.io/v2/cards';
// const defaultHeaders = {
//     'X-Api-Key': '160faf7f-a9ed-4d59-ba6e-8efe08144340',
// };

// export async function getCardsData({ name, pageSize, pageNumber }: ApiRarameters): Promise<PokemonCard> {
//     const paramString = `page=${pageNumber}&pageSize=${pageSize}&select=id,name,abilities,images,hp,attacks`;

//     const urlWithSearch = name ? `?q=name:${name}*&${paramString}` : `?${paramString}`;

//     const response = await fetch(path + urlWithSearch, {
//         method: 'GET',
//         headers: defaultHeaders,
//     });

//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }

//     const result = response.json();

//     return result;
// }

// export async function getCardDataById(id: string): Promise<CardData> {
//     const urlWithSearch = `/${id}`;

//     const response = await fetch(path + urlWithSearch, {
//         method: 'GET',
//         headers: defaultHeaders,
//     });

//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }

//     const result = response.json();

//     return result;
// }
// =====
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ApiRarameters } from '../types/types';

export const pokemonApi = createApi({
    reducerPath: 'pokemon',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.pokemontcg.io/v2/cards' }),
    endpoints: (buider) => ({
        getCards: buider.query({
            query: ({ name, pageSize, pageNumber }: ApiRarameters) => {
                console.log(7, name, pageSize, pageNumber);
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
