import { ReactNode } from 'react';

export interface SearchFormProps {
    title?: string;
    onValueChange: (value: string) => void;
}

export interface SearchFormState {
    inputValue: string;
}

interface Ability {
    name: string;
    text: string;
    type: string;
}

interface Attacks {
    name: string;
    cost: Array<string>;
    convertedEnergyCost: number;
    damage: string;
    text: string;
}

interface Pokemon {
    id: string;
    name: string;
    abilities: Array<Ability>;
    attacks: Array<Attacks>;
    hp: number;
    images: {
        small: string;
        large: string;
    };
}

export interface PokemonCard {
    data: Array<Pokemon>;
    page: number;
    pageSize: number;
    count: number;
    totalCount: number;
}

export interface CardsFieldProps {
    isDataLoaded: boolean;
    cardsData: PokemonCard;
}
export interface CardsFieldState {
    isDataLoaded: boolean;
    cardsData: PokemonCard;
}

export interface CardsPageState {
    inputValue: string;
    isDataLoaded: boolean;
    cardsData: PokemonCard;
}

export interface ErrorBoundaryState {
    hasError: boolean;
}

export interface ErrorButtonState {
    hasError: boolean;
}

export interface ErrorBoundaryProps {
    children: ReactNode;
}
