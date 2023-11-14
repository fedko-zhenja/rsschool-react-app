import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { NotFound } from '../components/NotFound/NotFound';

test('renders NotFound component on incorrect route', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <Routes>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </MemoryRouter>
    );

    history.pushState({}, '', '*');

    const notFoundElement = screen.getByText(/Not Found!/i);
    expect(notFoundElement).toBeInTheDocument();
});
