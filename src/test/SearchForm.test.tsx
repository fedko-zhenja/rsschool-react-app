import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchForm } from '../pages/CardsPage/components/SearchForm/SearchForm';

// Mocking the localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
};

beforeAll(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
});

afterEach(() => {
    jest.clearAllMocks();
});

test('search button click saves input value to local storage', () => {
    render(<SearchForm />);
    const inputValue = 'TestValue';

    fireEvent.change(screen.getByRole('textbox'), { target: { value: inputValue } });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    expect(localStorage.setItem).toHaveBeenCalledWith('inputValue', inputValue);
});

test('component retrieves value from local storage on mount', () => {
    const storedValue = 'StoredValue';
    localStorageMock.getItem.mockReturnValueOnce(storedValue);

    render(<SearchForm />);

    expect(localStorage.getItem).toHaveBeenCalledWith('inputValue');
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe(storedValue);
});
