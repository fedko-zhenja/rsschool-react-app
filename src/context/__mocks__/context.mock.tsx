import React from 'react';

export const useCardsContext = jest.fn();

export const CardsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => <div>{children}</div>;
