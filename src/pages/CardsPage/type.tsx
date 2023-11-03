import { PokemonCard } from '../../types/types';

export interface CardsPageState {
    searchValue: string;
    isDataLoaded: boolean;
    cardsData: PokemonCard;
    pageSizeValue: string;
}
