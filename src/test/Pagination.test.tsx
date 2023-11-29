import { fireEvent, render, screen } from '@testing-library/react';
import { Pagination } from '../components/Pagination';
import { mockCardsData, mockCardsDataIsNotLoaded } from './mockData';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

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
            <Provider store={store}>
                <Pagination />
            </Provider>,
            { wrapper: MemoryRouterProvider }
        );

        const paginationBtn = screen.getByText('1');
        expect(paginationBtn).toBeInstanceOf(HTMLElement);

        fireEvent.click(paginationBtn);

        expect(mockCardsData.pageNumberValue).toBe('1');
    });

    test('should not display buttons if data is not loaded', async () => {
        const { container } = render(
            <Provider store={storeIsNotLoaded}>
                <Pagination />
            </Provider>,
            { wrapper: MemoryRouterProvider }
        );

        expect(container.firstChild).toBeNull();
    });
});
