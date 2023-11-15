import React, { useContext } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Pagination } from '../pages/CardsPage/components/Pagination/Pagination';

const CardsContext = React.createContext({});

jest.mock('../context/context', () => ({
    useCardsContext: jest.fn(() => useContext(CardsContext)),
}));

describe('Pagination', () => {
    test('should do snapshot check', async () => {
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
                totalCount: 10,
            },
            setCardsData: jest.fn(),
            pageSizeValue: '4',
            setPageSizeValue: jest.fn(),
            pageNumberValue: '1',
            setPageNumberValue: jest.fn(),
        };

        const { asFragment } = render(
            <MemoryRouter>
                <CardsContext.Provider value={mockCardsData}>
                    <Pagination />
                </CardsContext.Provider>
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('should update URL query parameter when page changes', async () => {
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
                    <Pagination />
                </CardsContext.Provider>
            </MemoryRouter>
        );

        const paginationBtn = screen.getByText('1');
        expect(paginationBtn).toBeInstanceOf(HTMLElement);

        fireEvent.click(paginationBtn);

        expect(mockCardsData.setPageNumberValue).toHaveBeenCalledTimes(1);
    });

    test('should not display buttons if data is not loaded', async () => {
        const mockCardsData = {
            searchValue: '',
            setSearchValue: jest.fn(),
            isDataLoaded: false,
            setIsDataLoaded: jest.fn(),
            cardsData: {
                data: [{ id: 1, images: { large: 'image1.jpg' } }],
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

        const { container } = render(
            <MemoryRouter>
                <CardsContext.Provider value={mockCardsData}>
                    <Pagination />
                </CardsContext.Provider>
            </MemoryRouter>
        );

        expect(container.firstChild).toBeNull();
    });
});
