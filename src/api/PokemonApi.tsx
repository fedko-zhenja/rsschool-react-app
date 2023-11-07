import { PokemonCard, ApiRarameters } from '../types/types';
import { CardData } from '../types/types';

const path = 'https://api.pokemontcg.io/v2/cards';
const defaultHeaders = {
    'X-Api-Key': '160faf7f-a9ed-4d59-ba6e-8efe08144340',
};

export async function getCardsData({ name, pageSize, pageNumber }: ApiRarameters): Promise<PokemonCard> {
    const paramString = `page=${pageNumber}&pageSize=${pageSize}&select=id,name,abilities,images,hp,attacks`;

    const urlWithSearch = name ? `?q=name:${name}*&${paramString}` : `?${paramString}`;

    const response = await fetch(path + urlWithSearch, {
        method: 'GET',
        headers: defaultHeaders,
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const result = response.json();

    return result;
}

export async function getCardDataById(id: string): Promise<CardData> {
    const urlWithSearch = `/${id}`;

    const response = await fetch(path + urlWithSearch, {
        method: 'GET',
        headers: defaultHeaders,
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const result = response.json();

    return result;
}
