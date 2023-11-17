import { ReactNode } from 'react';
import './CardsField.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useCardsContext } from '../../../../context/context';

export function CardsField(): ReactNode {
    const location = useLocation();

    const context = useCardsContext();

    const isDataLoaded = context ? context.isDataLoaded : () => {};

    const cardsData = context ? context.cardsData : { data: [] };

    if (isDataLoaded === false) {
        return <h3>Loading...</h3>;
    }

    if (cardsData.data.length === 0) {
        return <h3>Not Found</h3>;
    }

    return (
        <div className="card-field">
            {cardsData.data.map((card, index) => (
                <Link key={index} to={`/details/${card.id}${location.search}`}>
                    <div className="card" key={index} id={String(index)} data-testid="card">
                        <img width="300px" src={card.images.large} data-testid="card-img"></img>
                    </div>
                </Link>
            ))}
        </div>
    );
}
