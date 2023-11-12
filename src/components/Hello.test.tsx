import { render, screen } from '@testing-library/react';
import React from 'react';
import { Hello } from './Hello';

test('render', () => {
    render(<Hello />);
    const myElement = screen.getByText('Hello world!');
    expect(myElement).toBeInTheDocument();
});
