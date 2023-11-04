export interface PokemonCard {
    data: Array<Pokemon>;
    page: number;
    pageSize: number;
    count: number;
    totalCount: number;
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

export interface ApiRarameters {
    name: string;
    pageSize: string;
    pageNumber: string;
}
