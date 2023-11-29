import { render, screen } from '@testing-library/react';
import NotFound from '../pages/404';

describe('404Page', () => {
    test('should render the NotFound component on the wrong route', () => {
        render(<NotFound />);

        const notFoundElement = screen.getByText(/Not Found.../i);
        expect(notFoundElement).toBeInTheDocument();
    });
});
