import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CardsField } from '../pages/CardsPage/components/CardsField/CardsField';
import { AdditionalCardsInfo } from '../pages/CardsPage/components/AdditionalCardsInfo/AdditionalCardsInfo';
import { mockCardsData } from './mockData';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as api from '../api/PokemonApi';

const mockUseGetCardByIdQuery = api.useGetCardByIdQuery as jest.MockedFunction<typeof api.useGetCardByIdQuery>;

jest.mock('../api/PokemonApi', () => ({
    ...jest.requireActual('../api/PokemonApi'),
    useGetCardByIdQuery: jest.fn(),
}));

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    cards: {
        cardsData: mockCardsData.cardsData,
        isDataLoaded: true,
    },
});

describe('Card', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should display relevant card details', async () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <CardsField />
                </Provider>
            </MemoryRouter>
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
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Provider store={store}>
                                <CardsField />
                            </Provider>
                        }
                    />
                    <Route path="/details/:index" element={<AdditionalCardsInfo />} />
                </Routes>
            </MemoryRouter>
        );

        const cardsElements = screen.getAllByRole('link');
        fireEvent.click(cardsElements[0]);

        const additionalCardInfoComponent = screen.queryByTestId(/additional-data/i);
        expect(additionalCardInfoComponent).toBeInTheDocument();
    });

    test('should make an additional API call to get detailed information when the card is clicked', async () => {
        mockUseGetCardByIdQuery.mockReturnValue({
            data: mockCardsData.cardsData,
            isFetching: false,
            refetch: jest.fn(),
        });

        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Provider store={store}>
                                <CardsField />
                            </Provider>
                        }
                    />
                    <Route path="/details/:index" element={<AdditionalCardsInfo />} />
                </Routes>
            </MemoryRouter>
        );

        const cardsElements = screen.getAllByRole('link');
        fireEvent.click(cardsElements[0]);

        expect(mockUseGetCardByIdQuery).toHaveBeenCalledTimes(2);
    });
});
