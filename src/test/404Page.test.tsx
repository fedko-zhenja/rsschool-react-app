import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import NotFound from '../pages/404';

describe('404Page', () => {
    test('should render the NotFound component on the wrong route', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </MemoryRouter>
        );

        const notFoundElement = screen.getByText(/Not Found.../i);
        expect(notFoundElement).toBeInTheDocument();
    });
});
