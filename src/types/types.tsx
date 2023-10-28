export interface SearchFormProps {
    title?: string;
}

export interface SearchFormState {
    value: string;
}

export interface CardsFieldProps {
    inputValue?: string;
}

// interface PokemonResult {
//     name: string;
//     url: string;
// }

// export interface PokemonData {
//     id: string;
//     name: string;
//     abilities: Array<>;
//     images: object;
// }
// export interface PokemonCard {
//     data: Array<PokemonData>;
//     page: number;
//     pageSize: number;
//     count: number;
//     totalCount: number;
// }

interface Ability {
    name: string;
    text: string;
    type: string;
}

interface Pokemon {
    id: string;
    name: string;
    abilities: Array<Ability>;
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

// export interface CardsFieldState {
//     inputValue: string;
//     cardsData: PokemonCard | object;
// }

export interface CardsFieldState {
    inputValue: string;
    isDataLoaded: boolean;
    cardsData: PokemonCard;
}
