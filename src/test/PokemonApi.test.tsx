import { getCardsData, getCardDataById } from '../api/PokemonApi';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('API functions', () => {
    test('should return data', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ name: 'Pikachu', pageSize: '10', pageNumber: '1' }));

        const result = await getCardsData({ name: 'Pikachu', pageSize: '10', pageNumber: '1' });
        expect(result).toEqual({ name: 'Pikachu', pageSize: '10', pageNumber: '1' });
    });

    test('should return data', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ id: 'test', name: 'test' }));

        const result = await getCardDataById('hgss4-1');

        expect(result).toEqual({ id: 'test', name: 'test' });
    });
});
