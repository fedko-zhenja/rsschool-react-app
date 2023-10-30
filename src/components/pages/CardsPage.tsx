import React, { ReactNode } from 'react';
import { SearchForm } from '../pageComponents/SearchForm/SearchForm';
import { CardsField } from '../pageComponents/CardsField/CardsField';
import { CardsPageState } from '../../types/types';
import './CardsPage.css';

import { getCardsData } from '../../api/PokemonApi';

export class CardsPage extends React.Component<object, CardsPageState> {
    constructor(props: object) {
        super(props);

        const localStorageInputValue = localStorage.getItem('inputValue') || '';

        this.state = {
            inputValue: localStorageInputValue,
            isDataLoaded: false,
            cardsData: {
                data: [],
                page: 0,
                pageSize: 0,
                count: 0,
                totalCount: 0,
            },
        };
    }

    handleValueChange = (value: string): void => {
        this.setState({ inputValue: value });
        setTimeout(() => {
            this.getCardsData();
        }, 0);
    };

    getCardsData = async (): Promise<void> => {
        try {
            const { inputValue } = this.state;

            this.setState({ isDataLoaded: false });

            let data = null;

            if (inputValue === '') {
                data = await getCardsData();
            } else {
                data = await getCardsData(inputValue);
            }

            this.setState({ cardsData: data, isDataLoaded: true });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    componentDidMount(): void {
        this.getCardsData();
    }

    render(): ReactNode {
        const { cardsData, isDataLoaded } = this.state;

        return (
            <div className="cards-page">
                <SearchForm title="Pokémon" onValueChange={this.handleValueChange} />
                <CardsField cardsData={cardsData} isDataLoaded={isDataLoaded} />
            </div>
        );
    }
}
