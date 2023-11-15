import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CardsField } from '../pages/CardsPage/components/CardsField/CardsField';

const CardsContext = React.createContext({});

jest.mock('../context/context', () => ({
    useCardsContext: jest.fn(() => useContext(CardsContext)),
}));

describe('CardsField', () => {
    test('should display "Not Found" when cardData.data.length is 0', () => {
        const mockCardsData = {
            searchValue: '',
            setSearchValue: jest.fn(),
            isDataLoaded: true,
            setIsDataLoaded: jest.fn(),
            cardsData: {
                data: [],
                page: 1,
                pageSize: 4,
                count: 1,
                totalCount: 10,
            },
            setCardsData: jest.fn(),
            pageSizeValue: '4',
            setPageSizeValue: jest.fn(),
            pageNumberValue: '1',
            setPageNumberValue: jest.fn(),
        };

        const { getByText } = render(
            <MemoryRouter>
                <CardsContext.Provider value={mockCardsData}>
                    <CardsField />
                </CardsContext.Provider>
            </MemoryRouter>
        );

        const notFoundElement = getByText(/Not Found/i);
        expect(notFoundElement).toBeInTheDocument();
    });

    test('should display the correct number of cards when loading data', () => {
        const mockCardsData = {
            searchValue: '',
            setSearchValue: jest.fn(),
            isDataLoaded: true,
            setIsDataLoaded: jest.fn(),
            cardsData: {
                data: [
                    { id: 1, images: { large: 'image1.jpg' } },
                    { id: 2, images: { large: 'image1.jpg' } },
                ],
                page: 1,
                pageSize: 4,
                count: 1,
                totalCount: 10,
            },
            setCardsData: jest.fn(),
            pageSizeValue: '4',
            setPageSizeValue: jest.fn(),
            pageNumberValue: '1',
            setPageNumberValue: jest.fn(),
        };

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
