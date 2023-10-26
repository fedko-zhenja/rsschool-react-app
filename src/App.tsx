import './App.css';
import React from 'react';
import { SearchForm } from './components/pageComponents/SearchForm/SearchForm';
import { CardsField } from './components/pageComponents/CardsField/CardsField';

export default class App extends React.Component {
    render() {
        return (
            <div className="app">
                <SearchForm title="Pokémon" />
                <CardsField />
            </div>
        );
    }
}
