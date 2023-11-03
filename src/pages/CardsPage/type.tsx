import { PokemonCard } from '../../types/types';

export interface CardsPageState {
    inputValue: string;
    isDataLoaded: boolean;
    cardsData: PokemonCard;
}
