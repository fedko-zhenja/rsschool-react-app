import React from 'react';
import { SearchForm } from '../pageComponents/SearchForm/SearchForm';
import { CardsField } from '../pageComponents/CardsField/CardsField';
import { CardsPageState } from '../../types/types';
import './CardsPage.css';

import { getCardsData2 } from '../../api/PokemonApi';

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

        // this.state.inputValue = localStorageInputValue;
    }

    handleValueChange = (value: string) => {
        this.setState({ inputValue: value });
        setTimeout(() => {
            // console.log(this.state.inputValue);
            this.getCardsData();
        }, 0);
    };

    getCardsData = async () => {
        try {
            let data = null;
            if (this.state.inputValue === '') {
                data = await getCardsData2();
            } else {
                // console.log(1, this.state.inputValue);
                data = await getCardsData2(this.state.inputValue);
            }
            // const data = await getCardsData2();
            this.setState({ cardsData: data, isDataLoaded: true });

            // this.setState({ cardsData: data, isDataLoaded: true });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    componentDidMount() {
        this.getCardsData();
        // console.log(555);
    }

    render() {
        // console.log(this.state.inputValue);
        return (
            <div className="cards-page">
                <SearchForm title="Pokémon" onValueChange={this.handleValueChange} />
                <CardsField cardsData={this.state.cardsData} isDataLoaded={this.state.isDataLoaded} />
            </div>
        );
    }
}
