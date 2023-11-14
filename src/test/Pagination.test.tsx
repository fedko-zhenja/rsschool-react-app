import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CardsProvider } from '../context/context';
import { Pagination } from '../pages/CardsPage/components/Pagination/Pagination';

jest.mock('../context/context');

test('component updates URL query parameter when page changes', async () => {
    const mockCardsData = {
        searchValue: '',
        setSearchValue: jest.fn(),
        isDataLoaded: true,
        setIsDataLoaded: jest.fn(),
        cardsData: {
            data: [{ id: 1, images: { large: 'image1.jpg' } }],
            page: 1,
            pageSize: 4,
            count: 1,
            totalCount: 1,
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
                    <Pagination />
                </CardsProvider>
            </MemoryRouter>
        );

        const paginationBtn = screen.getByTestId('pagination-btn');
        expect(paginationBtn).toBe(HTMLElement);

        fireEvent.click(paginationBtn);

        expect(mockCardsData.setPageNumberValue).toHaveBeenCalledTimes(1);
    }, 1000);
});
