export interface SearchFormProps {
    title?: string;
    onValueChange: (value: string) => void;
}

export interface SearchFormState {
    value: string;
}

export interface CardsFieldProps {
    inputValue?: string;
}

export interface CardsPageState {
    inputValue: string;
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

// export interface CardsFieldState {
//     inputValue: string;
//     cardsData: PokemonCard | object;
// }

export interface CardsFieldState {
    isDataLoaded: boolean;
    cardsData: PokemonCard;
}
