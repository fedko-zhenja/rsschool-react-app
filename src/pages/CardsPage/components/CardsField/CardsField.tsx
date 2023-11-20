import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../../store/type';
import './CardsField.css';

export function CardsField(): ReactNode {
    const location = useLocation();

    const reduxCardsData = useSelector((state: StoreState) => state.cards.cardsData);
    const reduxIsDataLoaded = useSelector((state: StoreState) => state.cards.isDataLoaded);

    if (reduxIsDataLoaded === false) {
        return <h3>Loading...</h3>;
    }

    if (reduxCardsData.data.length === 0) {
        return <h3>Not Found</h3>;
    }

    return (
        <div className="card-field">
            {reduxCardsData.data.map((card, index) => (
                <Link key={index} to={`/details/${card.id}${location.search}`}>
                    <div className="card" key={index} id={String(index)} data-testid="card">
                        <img width="300px" src={card.images.large} data-testid="card-img"></img>
                    </div>
                </Link>
            ))}
        </div>
    );
}
