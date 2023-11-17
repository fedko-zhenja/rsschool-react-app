import { PokemonCard } from '../types/types';

export interface ContextType {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    isDataLoaded: boolean;
    setIsDataLoaded: React.Dispatch<React.SetStateAction<boolean>>;
    cardsData: PokemonCard;
    setCardsData: React.Dispatch<React.SetStateAction<PokemonCard>>;
    pageSizeValue: string;
    setPageSizeValue: React.Dispatch<React.SetStateAction<string>>;
    pageNumberValue: string;
    setPageNumberValue: React.Dispatch<React.SetStateAction<string>>;
}
