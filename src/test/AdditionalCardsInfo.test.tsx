import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AdditionalCardsInfo } from '../pages/CardsPage/components/AdditionalCardsInfo/AdditionalCardsInfo';
import * as PokemonApiModule from '../api/PokemonApi';
import { CardData } from '../types/types';

const mockGetCardDataById = jest.spyOn(PokemonApiModule, 'getCardDataById');
jest.mock('../api/PokemonApi');

describe('AdditionalCardsInfo', () => {
    it('displays a loading indicator while fetching data', async () => {
        const mockCardData: CardData = {
            data: {
                name: 'Test Card',
                hp: '100',
                level: '50',
                attacks: [
                    {
                        name: 'Test Attack',
                        cost: ['Colorless'],
                        convertedEnergyCost: 1,
                        damage: '20',
                        text: 'This is a test attack.',
                    },
                ],
            },
        };

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

    it('displays detailed card data correctly', async () => {
        const mockCardData: CardData = {
            data: {
                name: 'Test Card',
                hp: '100',
                level: '50',
                attacks: [
                    {
                        name: 'Test Attack',
                        cost: ['Colorless'],
                        convertedEnergyCost: 1,
                        damage: '20',
                        text: 'This is a test attack.',
                    },
                ],
            },
        };

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

    it('hides the component when close button is clicked', async () => {
        const mockCardData: CardData = {
            data: {
                name: 'Test Card',
                hp: '100',
                level: '50',
                attacks: [
                    {
                        name: 'Test Attack',
                        cost: ['Colorless'],
                        convertedEnergyCost: 1,
                        damage: '20',
                        text: 'This is a test attack.',
                    },
                ],
            },
        };

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
