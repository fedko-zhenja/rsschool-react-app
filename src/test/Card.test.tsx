import React, { useContext } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CardsField } from '../pages/CardsPage/components/CardsField/CardsField';
import { AdditionalCardsInfo } from '../pages/CardsPage/components/AdditionalCardsInfo/AdditionalCardsInfo';
import { mockCardsData } from './mockData';

global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
        json: () => Promise.resolve({ data: 'mocked data' }),
    })
);

const CardsContext = React.createContext({});

jest.mock('../context/context', () => ({
    useCardsContext: jest.fn(() => useContext(CardsContext)),
}));

describe('Card', () => {
    test('should display relevant card details', async () => {
        render(
            <MemoryRouter>
                <CardsContext.Provider value={mockCardsData}>
                    <CardsField />
                </CardsContext.Provider>
            </MemoryRouter>
        );

        const cards = screen.getAllByTestId('card-img');
        expect(cards.length).toBe(mockCardsData.cardsData.data.length);
    });

    test('should open the detailed card component by clicking on the card', async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <CardsContext.Provider value={mockCardsData}>
                                <CardsField />
                            </CardsContext.Provider>
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
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <CardsContext.Provider value={mockCardsData}>
                                <CardsField />
                            </CardsContext.Provider>
                        }
                    />
                    <Route path="/details/:index" element={<AdditionalCardsInfo />} />
                </Routes>
            </MemoryRouter>
        );

        const cardsElements = screen.getAllByRole('link');
        fireEvent.click(cardsElements[0]);

        expect(global.fetch).toHaveBeenCalledTimes(2);
    });
});
