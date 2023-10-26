export interface SearchFormProps {
    title?: string;
}

export interface SearchFormState {
    value: string;
}

export interface CardsFieldProps {
    title?: string;
}

interface PokemonResult {
    name: string;
    url: string;
}

export interface CardsFieldState {
    error: Error | null;
    isLoaded: boolean;
    items: PokemonResult[];
    img: string[];
    description: PokemonResult[];
}
