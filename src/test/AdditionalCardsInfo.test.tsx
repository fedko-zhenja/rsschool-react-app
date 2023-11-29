import { render, screen, waitFor } from '@testing-library/react';
import { AdditionalCardsInfo } from '../components/AdditionalCardsInfo';
import { mockCardData } from './mockData';
import * as api from '../lib/PokemonApi';
import { createMockRouter } from './mockData';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

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

        render(<AdditionalCardsInfo />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('should display card details correctly', async () => {
        mockUseGetCardByIdQuery.mockReturnValue({
            data: mockCardData,
            isFetching: false,
            refetch: jest.fn(),
        });

        render(<AdditionalCardsInfo />);

        await waitFor(() => {
            expect(screen.getByText('Name:')).toBeInTheDocument();
            expect(screen.getByText('Test Card')).toBeInTheDocument();
            expect(screen.getByText('Health power:')).toBeInTheDocument();
            expect(screen.getByText('100')).toBeInTheDocument();
        });
    });
});
