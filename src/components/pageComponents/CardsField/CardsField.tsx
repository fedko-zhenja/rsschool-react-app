import React from 'react';
import { CardsFieldProps } from '../../../types/types';
import './CardsField.css';

export class CardsField extends React.Component<CardsFieldProps> {
    constructor(props: CardsFieldProps) {
        super(props);
    }

    render() {
        if (this.props.isDataLoaded === false) {
            return <div>Loading...</div>;
        }

        if (this.props.cardsData.data.length === 0) {
            return <div>Not Found</div>;
        }

        return (
            <div className="card-field">
                {this.props.cardsData.data.map((card, index) => (
                    <div className="card" key={index}>
                        <span>
                            Name: <span className="card-data">{card.name}</span>
                        </span>
                        <span>
                            Health power:
                            <span className="card-data"> {card.hp}</span>
                        </span>
                        <span>
                            Attacks:
                            <span className="card-data"> {card.attacks?.[0]?.name}</span>
                        </span>
                        <img width="250px" src={card.images.large}></img>
                    </div>
                ))}
            </div>
        );
    }
}
