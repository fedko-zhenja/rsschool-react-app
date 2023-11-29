import { render, screen } from '@testing-library/react';
import NavBar from '../components/NavBar';
import About from '../pages/about';

jest.mock('next/router', () => ({
    ...jest.requireActual('next/router'),
    useRouter: () => ({
        pathname: '/',
    }),
}));

describe('NavBar Component', () => {
    test('should be shown on the display', () => {
        render(<NavBar />);

        const titleElement = screen.getByText(/Pokémon/i);
        expect(titleElement).toBeInTheDocument();

        const cardsLink = screen.getByText(/Cards/i);
        const aboutLink = screen.getByText(/About/i);

        expect(cardsLink).toBeInTheDocument();
        expect(aboutLink).toBeInTheDocument();
    });

    test('should go to the “About” page', () => {
        render(<About />);

        const aboutText = screen.getByText(/Welcome to our application!/i);
        expect(aboutText).toBeInTheDocument();
    });
});
