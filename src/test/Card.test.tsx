import { fireEvent, render, screen } from '@testing-library/react';
import { CardsField } from '../components/CardsField';
import { mockCardsData } from './mockData';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as api from '../lib/PokemonApi';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';
import mockRouter from 'next-router-mock';

const mockUseGetCardByIdQuery = api.useGetCardByIdQuery as jest.MockedFunction<typeof api.useGetCardByIdQuery>;

jest.mock('../lib/PokemonApi', () => ({
    ...jest.requireActual('../lib/PokemonApi'),
    useGetCardByIdQuery: jest.fn(),
}));

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    cards: {
        cardsData: mockCardsData.cardsData,
        isDataLoaded: true,
    },
});

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Card', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should display relevant card details', async () => {
        render(
            <Provider store={store}>
                <CardsField />
            </Provider>,
            { wrapper: MemoryRouterProvider }
        );

        const cards = screen.getAllByTestId('card-img');
        expect(cards.length).toBe(mockCardsData.cardsData.data.length);
    });

    test('should open the detailed card component by clicking on the card', async () => {
        mockUseGetCardByIdQuery.mockReturnValue({
            data: mockCardsData.cardsData,
            isFetching: false,
            refetch: jest.fn(),
        });

        render(
            <Provider store={store}>
                <CardsField />
            </Provider>,
            { wrapper: MemoryRouterProvider }
        );

        const cardsElements = screen.getAllByRole('img');
        fireEvent.click(cardsElements[0]);
        expect(mockRouter.asPath).toBe('/?page=undefined&details=1');
    });
});
