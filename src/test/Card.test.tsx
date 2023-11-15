import React, { useContext } from 'react';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CardsField } from '../pages/CardsPage/components/CardsField/CardsField';

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
        const mockCardsData = {
            searchValue: '',
            setSearchValue: jest.fn(),
            isDataLoaded: true,
            setIsDataLoaded: jest.fn(),
            cardsData: {
                data: [
                    { id: 1, images: { large: 'image1.jpg' } },
                    { id: 2, images: { large: 'image2.jpg' } },
                ],
                page: 0,
                pageSize: 0,
                count: 0,
                totalCount: 0,
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

        const cards = screen.getAllByTestId('card-img');
        expect(cards.length).toBe(mockCardsData.cardsData.data.length);
    });

    test('should open the detailed card component by clicking on the card', async () => {
        const mockCardsData = {
            searchValue: '',
            setSearchValue: jest.fn(),
            isDataLoaded: true,
            setIsDataLoaded: jest.fn(),
            cardsData: {
                data: [{ id: 1, images: { large: 'image1.jpg' } }],
                page: 0,
                pageSize: 0,
                count: 0,
                totalCount: 0,
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

        const cards = screen.getByTestId('card');

        const cardsElements = screen.getAllByRole('link');
        fireEvent.click(cardsElements[0]);

        waitForElementToBeRemoved(cards).then(() => {
            const additionalCardInfoComponent = screen.queryByTestId(/additional-data/i);
            expect(additionalCardInfoComponent).toBeInTheDocument();
        });
    });

    test('should make an additional API call to get detailed information when the card is clicked', async () => {
        const mockCardsData = {
            searchValue: '',
            setSearchValue: jest.fn(),
            isDataLoaded: true,
            setIsDataLoaded: jest.fn(),
            cardsData: {
                data: [{ id: 1, images: { large: 'image1.jpg' } }],
                page: 0,
                pageSize: 0,
                count: 0,
                totalCount: 0,
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

        const cards = screen.getByTestId('card');

        const cardsElements = screen.getAllByRole('link');
        fireEvent.click(cardsElements[0]);

        waitForElementToBeRemoved(cards).then(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });
    });
});
