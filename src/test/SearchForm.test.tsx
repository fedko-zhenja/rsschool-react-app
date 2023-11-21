import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchForm } from '../pages/CardsPage/components/SearchForm/SearchForm';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mockCardsData } from './mockData';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    cards: {
        cardsData: mockCardsData.cardsData,
        isDataLoaded: true,
    },
});

describe('SearchForm', () => {
    const localStorageMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
    };

    beforeAll(() => {
        Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should save the entered value in local storage', () => {
        render(
            <Provider store={store}>
                <SearchForm />
            </Provider>
        );
        const inputValue = 'TestValue';

        fireEvent.change(screen.getByRole('textbox'), { target: { value: inputValue } });
        fireEvent.click(screen.getByRole('button', { name: 'Search' }));

        expect(localStorage.setItem).toHaveBeenCalledWith('inputValue', inputValue);
    });

    test('should get the value from local storage', async () => {
        const storedValue = 'mockedValue';

        const store = mockStore({
            cards: {
                searchValue: localStorageMock.getItem.mockReturnValueOnce(storedValue),
            },
        });

        render(
            <Provider store={store}>
                <SearchForm />
            </Provider>
        );

        const input = screen.getByRole('textbox');
        expect((input as HTMLInputElement).value).toBe(storedValue);
    });
});
