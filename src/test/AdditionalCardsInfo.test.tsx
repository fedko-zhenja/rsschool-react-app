import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AdditionalCardsInfo } from '../components/AdditionalCardsInfo';
import { mockCardData } from './mockData';
import * as api from '../lib/PokemonApi';
import { createMockRouter } from './mockData';

const mockUseGetCardByIdQuery = api.useGetCardByIdQuery as jest.MockedFunction<typeof api.useGetCardByIdQuery>;

jest.mock('../lib/PokemonApi', () => ({
    ...jest.requireActual('../lib/PokemonApi'),
    useGetCardByIdQuery: jest.fn(),
}));

jest.mock('next/router', () => ({
    ...jest.requireActual('next/router'),
    useRouter: () => createMockRouter({}),
}));

describe('AdditionalCardsInfo', () => {
    test('should display a loading indicator when receiving data', async () => {
        mockUseGetCardByIdQuery.mockReturnValue({
            data: mockCardData,
            isFetching: true,
            refetch: jest.fn(),
        });

        render(
            <MemoryRouter initialEntries={['/cards/1']}>
                <Routes>
                    <Route path="/cards/:index" element={<AdditionalCardsInfo />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('should display card details correctly', async () => {
        mockUseGetCardByIdQuery.mockReturnValue({
            data: mockCardData,
            isFetching: false,
            refetch: jest.fn(),
        });

        render(
            <MemoryRouter initialEntries={['/cards/1']}>
                <Routes>
                    <Route path="/cards/:index" element={<AdditionalCardsInfo />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Name:')).toBeInTheDocument();
            expect(screen.getByText('Test Card')).toBeInTheDocument();
            expect(screen.getByText('Health power:')).toBeInTheDocument();
            expect(screen.getByText('100')).toBeInTheDocument();
        });
    });

    test('should hide the component when the close button is clicked', async () => {
        mockUseGetCardByIdQuery.mockReturnValue({
            data: mockCardData,
            isFetching: false,
            refetch: jest.fn(),
        });

        render(
            <MemoryRouter initialEntries={['/cards/1']}>
                <Routes>
                    <Route path="/cards/:index" element={<AdditionalCardsInfo />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Name:')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('X'));

        expect(screen.queryByText('Name:')).toBeNull();
    });
});
