import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Pagination } from '../pages/CardsPage/components/Pagination/Pagination';
import { mockCardsData, mockCardsDataIsNotLoaded } from './mockData';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    cards: {
        cardsData: mockCardsData.cardsData,
        isDataLoaded: true,
        pageSizeValue: '4',
        pageNumberValue: '2',
    },
});

const storeIsNotLoaded = mockStore({
    cards: {
        cardsData: mockCardsDataIsNotLoaded.cardsData,
        isDataLoaded: false,
        pageSizeValue: '0',
        pageNumberValue: '0',
    },
});

describe('Pagination', () => {
    test('should update URL query parameter when page changes', async () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <Pagination />
                </Provider>
            </MemoryRouter>
        );

        const paginationBtn = screen.getByText('1');
        expect(paginationBtn).toBeInstanceOf(HTMLElement);

        fireEvent.click(paginationBtn);

        expect(mockCardsData.pageNumberValue).toBe('1');
    });

    test('should not display buttons if data is not loaded', async () => {
        const { container } = render(
            <MemoryRouter>
                <Provider store={storeIsNotLoaded}>
                    <Pagination />
                </Provider>
            </MemoryRouter>
        );

        expect(container.firstChild).toBeNull();
    });
});
