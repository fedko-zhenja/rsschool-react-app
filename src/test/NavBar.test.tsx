import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavBar } from '../application/Layout/NavBar/NavBar';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AboutPage } from '../pages/AboutPage/AboutPage';

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
});
