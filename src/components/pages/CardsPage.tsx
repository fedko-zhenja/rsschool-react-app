import React from 'react';
import { SearchForm } from '../pageComponents/SearchForm/SearchForm';
import { CardsField } from '../pageComponents/CardsField/CardsField';
import { CardsPageState } from '../../types/types';
import './CardsPage.css';

export class CardsPage extends React.Component<object, CardsPageState> {
    constructor(props: object) {
        super(props);
        this.state = {
            inputValue: '',
        };
    }

    handleValueChange = (value: string) => {
        this.setState({ inputValue: value });
        // setTimeout(() => {
        //     console.log(this.state.inputValue);
        // }, 0);
    };

    render() {
        console.log(this.state.inputValue);
        return (
            <div className="cards-page">
                <SearchForm title="Pokémon" onValueChange={this.handleValueChange} />
                <CardsField inputValue={this.state.inputValue} />
            </div>
        );
    }
}
