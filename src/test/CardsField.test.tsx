import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CardsField } from '../pages/CardsPage/components/CardsField/CardsField';
import { mockEmptyCardsData, mockCardsData } from './mockData';

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

describe('CardsField', () => {
    test('should display "Not Found" when cardData.data.length is 0', async () => {
        render(
            <MemoryRouter>
                <Provider store={emptyStore}>
                    <CardsField />
                </Provider>
            </MemoryRouter>
        );

        const notFoundElement = screen.queryByText(/Not Found/i);
        expect(notFoundElement).toBeInTheDocument();
    });

    test('should display the correct number of cards when loading data', async () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <CardsField />
                </Provider>
            </MemoryRouter>
        );

        const cards = screen.queryAllByTestId('card');
        expect(cards.length).toBe(mockCardsData.cardsData.data.length);
    });
});
