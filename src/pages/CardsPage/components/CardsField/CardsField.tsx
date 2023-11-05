import React, { ReactNode } from 'react';
import { CardsFieldProps } from './type';
import './CardsField.css';
import { Link } from 'react-router-dom';

export function CardsField({ isDataLoaded, cardsData }: CardsFieldProps): ReactNode {
    if (isDataLoaded === false) {
        return <h3>Loading...</h3>;
    }

    if (cardsData.data.length === 0) {
        return <h3>Not Found</h3>;
    }

    const handleCardClick = (event: React.MouseEvent) => {
        console.log(event.currentTarget.id);
    };

    return (
        <div className="card-field">
            {cardsData.data.map((card, index) => (
                <Link key={index} to={`${card.id}`}>
                    <div className="card" key={index} id={String(index)} onClick={handleCardClick}>
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
                </Link>
            ))}
        </div>
    );
}
