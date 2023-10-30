import React, { ReactNode } from 'react';
import { CardsFieldProps } from '../../../types/types';
import './CardsField.css';

export class CardsField extends React.Component<CardsFieldProps> {
    render(): ReactNode {
        const { isDataLoaded, cardsData } = this.props;

        if (isDataLoaded === false) {
            return <h3>Loading...</h3>;
        }

        if (cardsData.data.length === 0) {
            return <h3>Not Found</h3>;
        }

        return (
            <div className="card-field">
                {cardsData.data.map((card, index) => (
                    <div className="card" key={index}>
                        <span>
                            Name: <span className="card-data">{card.name}</span>
                        </span>
                        <span>
                            Health power:
                            <span className="card-data"> {card.hp ? card.hp : 'none'}</span>
                        </span>
                        <span>
                            Attacks:
                            <span className="card-data"> {card.attacks?.[0] ? card.attacks?.[0].name : 'none'}</span>
                        </span>
                        <img width="250px" src={card.images.large}></img>
                    </div>
                ))}
            </div>
        );
    }
}
