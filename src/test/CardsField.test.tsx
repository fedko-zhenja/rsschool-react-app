import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CardsField } from '../pages/CardsPage/components/CardsField/CardsField';
import { mockEmptyCardsData, mockCardsData } from './mockData';

const CardsContext = React.createContext({});

jest.mock('../context/context', () => ({
    useCardsContext: jest.fn(() => useContext(CardsContext)),
}));

describe('CardsField', () => {
    test('should display "Not Found" when cardData.data.length is 0', () => {
        const { getByText } = render(
            <MemoryRouter>
                <CardsContext.Provider value={mockEmptyCardsData}>
                    <CardsField />
                </CardsContext.Provider>
            </MemoryRouter>
        );

        const notFoundElement = getByText(/Not Found/i);
        expect(notFoundElement).toBeInTheDocument();
    });

    test('should display the correct number of cards when loading data', () => {
        render(
            <MemoryRouter>
                <CardsContext.Provider value={mockCardsData}>
                    <CardsField />
                </CardsContext.Provider>
            </MemoryRouter>
        );

        const cards = screen.getAllByTestId('card');
        expect(cards.length).toBe(mockCardsData.cardsData.data.length);
    });
});
