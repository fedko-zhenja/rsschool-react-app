import React, { ReactNode } from 'react';
import { CardsPage } from './components/pages/CardsPage';
import './App.css';

export default class App extends React.Component {
    render(): ReactNode {
        return <CardsPage />;
    }
}
