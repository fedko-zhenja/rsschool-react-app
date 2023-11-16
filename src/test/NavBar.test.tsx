import React, { useContext } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavBar } from '../application/Layout/NavBar/NavBar';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AboutPage } from '../pages/AboutPage/AboutPage';
import { CardsPage } from '../pages/CardsPage/CardsPage';
import { mockCardsData } from './mockData';

const CardsContext = React.createContext({});

jest.mock('../context/context', () => ({
    useCardsContext: jest.fn(() => useContext(CardsContext)),
}));

describe('NavBar Component', () => {
    test('should be shown on the display', () => {
        render(
            <Router>
                <NavBar />
            </Router>
        );

        const titleElement = screen.getByText(/Pokémon/i);
        expect(titleElement).toBeInTheDocument();

        const cardsLink = screen.getByText(/Cards/i);
        const aboutLink = screen.getByText(/About/i);

        expect(cardsLink).toBeInTheDocument();
        expect(aboutLink).toBeInTheDocument();
    });

    test('should go to the “About” page', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/" element={<NavBar />} />
                </Routes>
            </MemoryRouter>
        );

        const aboutLink = screen.getByText(/About/i);
        fireEvent.click(aboutLink);

        const aboutText = screen.getByText(/Welcome to our application!/i);
        expect(aboutText).toBeInTheDocument();
    });

    test('should go to the “Cards” page', async () => {
        render(
            <MemoryRouter>
                <CardsContext.Provider value={mockCardsData}>
                    <CardsPage />
                </CardsContext.Provider>
            </MemoryRouter>
        );

        const cardsLink = screen.getByText(/Cards/i);
        fireEvent.click(cardsLink);

        await waitFor(() => {
            const cardsPageElement = screen.getByText(/Number of cards:/i);
            expect(cardsPageElement).toBeInTheDocument();
        });
    });
});
