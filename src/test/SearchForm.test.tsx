import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchForm } from '../components/SearchForm';
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
    test('should be on the page', () => {
        render(
            <Provider store={store}>
                <SearchForm />
            </Provider>
        );

        const searchBtn = screen.getByText('Search');
        expect(searchBtn).toBeInTheDocument();
    });
});
