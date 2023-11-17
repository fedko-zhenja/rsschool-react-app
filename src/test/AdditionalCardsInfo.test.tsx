import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AdditionalCardsInfo } from '../pages/CardsPage/components/AdditionalCardsInfo/AdditionalCardsInfo';
import * as PokemonApiModule from '../api/PokemonApi';
import { mockCardData } from './mockData';

const mockGetCardDataById = jest.spyOn(PokemonApiModule, 'getCardDataById');
jest.mock('../api/PokemonApi');

describe('AdditionalCardsInfo', () => {
    test('should display a loading indicator when receiving data', async () => {
        mockGetCardDataById.mockResolvedValueOnce(mockCardData);

        render(
            <MemoryRouter initialEntries={['/cards/1']}>
                <Routes>
                    <Route path="/cards/:index" element={<AdditionalCardsInfo />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByText('Loading...')).toBeNull();
            expect(screen.getByText('Name:')).toBeInTheDocument();
        });
    });

    test('should display card details correctly', async () => {
        mockGetCardDataById.mockResolvedValueOnce(mockCardData);

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
        mockGetCardDataById.mockResolvedValueOnce(mockCardData);

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
