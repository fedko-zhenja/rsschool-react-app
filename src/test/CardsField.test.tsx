import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CardsField } from '../components/CardsField';
import { mockEmptyCardsData, mockCardsData, mockCardsDataIsNotLoaded } from './mockData';
import { createMockRouter } from './mockData';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    cards: {
        cardsData: mockCardsData.cardsData,
        isDataLoaded: true,
    },
});

const emptyStore = mockStore({
    cards: {
        cardsData: mockEmptyCardsData.cardsData,
        isDataLoaded: true,
    },
});

const isNotLadedStore = mockStore({
    cards: {
        cardsData: mockCardsDataIsNotLoaded.cardsData,
        isDataLoaded: false,
    },
});

jest.mock('next/router', () => ({
    ...jest.requireActual('next/router'),
    useRouter: () => createMockRouter({}),
}));

describe('CardsField', () => {
    test('should display "Not Found" when cardData.data.length is 0', async () => {
        render(
            <Provider store={emptyStore}>
                <CardsField />
            </Provider>,
            { wrapper: MemoryRouterProvider }
        );

        const notFoundElement = screen.queryByText(/Not Found/i);
        expect(notFoundElement).toBeInTheDocument();
    });

    test('should display the correct number of cards when loading data', async () => {
        render(
            <Provider store={store}>
                <CardsField />
            </Provider>,
            { wrapper: MemoryRouterProvider }
        );

        const cards = screen.queryAllByTestId('card');
        expect(cards.length).toBe(mockCardsData.cardsData.data.length);
    });

    test('should display loading when data has not yet been loaded', async () => {
        render(
            <Provider store={isNotLadedStore}>
                <CardsField />
            </Provider>,
            { wrapper: MemoryRouterProvider }
        );

        const loadingElement = screen.queryByText(/Loading.../i);
        expect(loadingElement).toBeInTheDocument();
    });
});
