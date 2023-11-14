import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CardsField } from '../pages/CardsPage/components/CardsField/CardsField';
import { CardsProvider } from '../context/context';

global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
        json: () => Promise.resolve({ data: 'mocked data' }),
    })
);

jest.mock('../context/context');

test('displays relevant card data', async () => {
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

    await require('../context/context').useCardsContext.mockImplementation(() => mockCardsData);

    setTimeout(() => {
        render(
            <MemoryRouter>
                <CardsProvider>
                    <CardsField />
                </CardsProvider>
            </MemoryRouter>
        );

        const cards = screen.getAllByTestId('card-img');
        expect(cards.length).toBe(mockCardsData.cardsData.data.length);
    }, 1000);
});

test('clicking on a map opens the detailed map component', async () => {
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

    await require('../context/context').useCardsContext.mockImplementation(() => mockCardsData);

    setTimeout(() => {
        render(
            <MemoryRouter>
                <CardsProvider>
                    <CardsField />
                </CardsProvider>
            </MemoryRouter>
        );

        const cards = screen.getByTestId('card');
        expect(cards).toBe(HTMLElement);

        fireEvent.click(cards);

        const additionalCardInfoComponent = screen.getByTestId('additional-data');
        expect(additionalCardInfoComponent).toBe(HTMLElement);
    }, 1000);
});

test('clicking on a map opens the detailed map component', async () => {
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

    await require('../context/context').useCardsContext.mockImplementation(() => mockCardsData);

    setTimeout(() => {
        render(
            <MemoryRouter>
                <CardsProvider>
                    <CardsField />
                </CardsProvider>
            </MemoryRouter>
        );

        const cards = screen.getByTestId('card');
        expect(cards).toBe(HTMLElement);

        fireEvent.click(cards);

        const additionalCardInfoComponent = screen.getByTestId('additional-data');
        expect(additionalCardInfoComponent).toBe(HTMLElement);

        expect(global.fetch).toHaveBeenCalledTimes(1);
    }, 1000);
});
