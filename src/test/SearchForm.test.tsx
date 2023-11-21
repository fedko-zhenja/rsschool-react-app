// import React from 'react';
// import { render, fireEvent, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { SearchForm } from '../pages/CardsPage/components/SearchForm/SearchForm';

// describe.skip('SearchForm', () => {
//     const localStorageMock = {
//         getItem: jest.fn(),
//         setItem: jest.fn(),
//     };

//     beforeAll(() => {
//         Object.defineProperty(window, 'localStorage', { value: localStorageMock });
//     });

//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     test('should save the entered value in local storage', () => {
//         render(<SearchForm />);
//         const inputValue = 'TestValue';

//         fireEvent.change(screen.getByRole('textbox'), { target: { value: inputValue } });
//         fireEvent.click(screen.getByRole('button', { name: 'Search' }));

//         expect(localStorage.setItem).toHaveBeenCalledWith('inputValue', inputValue);
//     });

//     test('should get the value from local storage', () => {
//         const storedValue = 'StoredValue';
//         localStorageMock.getItem.mockReturnValueOnce(storedValue);

//         render(<SearchForm />);

//         expect(localStorage.getItem).toHaveBeenCalledWith('inputValue');
//         expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe(storedValue);
//     });
// });
