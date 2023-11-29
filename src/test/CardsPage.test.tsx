import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CardsPage from '../components/CardsPage';
import { mockCardsData, mockCardsPageProps, mockCardData } from './mockData';
import { createMockRouter } from './mockData';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';
import * as api from '../lib/PokemonApi';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    cards: {
        cardsData: mockCardsData.cardsData,
        isDataLoaded: true,
    },
});

jest.mock('next/router', () => ({
    ...jest.requireActual('next/router'),
    useRouter: () => createMockRouter({}),
}));

import { useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn(),
}));

const mockGet = jest.fn();
mockGet.mockReturnValue('5000');

(useSearchParams as jest.Mock).mockReturnValue({
    get: mockGet,
});

const mockUseGetCardByIdQuery = api.useGetCardByIdQuery as jest.MockedFunction<typeof api.useGetCardByIdQuery>;
const mockUseGetCardsQuery = api.useGetCardsQuery as jest.MockedFunction<typeof api.useGetCardsQuery>;

jest.mock('../lib/PokemonApi', () => ({
    ...jest.requireActual('../lib/PokemonApi'),
    useGetCardByIdQuery: jest.fn(),
    useGetCardsQuery: jest.fn(),
}));

describe('Cards Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('title should be displayed', async () => {
        mockUseGetCardByIdQuery.mockReturnValue({
            data: mockCardData,
            isFetching: true,
            refetch: jest.fn(),
        });

        mockUseGetCardsQuery.mockReturnValue({
            data: mockCardsData,
            isFetching: true,
            refetch: jest.fn(),
        });

        render(
            <Provider store={store}>
                <CardsPage initialData={mockCardsPageProps} />
            </Provider>,
            { wrapper: MemoryRouterProvider }
        );

        const selectTitle = screen.getByText('Number of cards:');
        expect(selectTitle).toBeInTheDocument();
    });
});
