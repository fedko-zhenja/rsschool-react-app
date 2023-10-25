import './App.css';
import React from 'react';
import { SearchForm } from './components/pageComponents/SearchForm/SearchForm';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <SearchForm title="Title page" />
            </div>
        );
    }
}
