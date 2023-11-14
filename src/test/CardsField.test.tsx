import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CardsField } from '../pages/CardsPage/components/CardsField/CardsField';
import { CardsProvider } from '../context/context';

jest.mock('../context/context');

test('renders "Not Found" when cardsData.data.length is 0', () => {
    const { getByText } = render(
        <MemoryRouter>
            <CardsField />
        </MemoryRouter>
    );

    const notFoundElement = getByText(/Not Found/i);
    expect(notFoundElement).toBeInTheDocument();
});

test('renders the correct number of cards when data is loaded', async () => {
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
        const { container } = render(
            <MemoryRouter>
                <CardsProvider>
                    <CardsField />
                </CardsProvider>
            </MemoryRouter>
        );

        const cards = container.querySelectorAll('.card');
        expect(cards.length).toBe(mockCardsData.cardsData.data.length);
    }, 1000);
});
