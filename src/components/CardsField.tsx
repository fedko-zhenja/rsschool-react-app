import { ReactNode } from 'react';
// import { Link } from 'react-router-dom';
// import Link from 'next/link';
// import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreState } from '../types/types';
import styles from '../styles/CardsField.module.css';
import { useRouter } from 'next/router';
// import { usePathname } from 'next/navigation';
// import { useRouter } from 'next/router';

export function CardsField(): ReactNode {
    // const location = useLocation();
    // const pathname = useRouter();
    const router = useRouter();
    const { page } = router.query;
    // console.log(pathname);

    const reduxCardsData = useSelector((state: StoreState) => state.cards.cardsData);
    const reduxIsDataLoaded = useSelector((state: StoreState) => state.cards.isDataLoaded);

    if (reduxIsDataLoaded === false) {
        return <h3>Loading...</h3>;
    }

    if (reduxCardsData.data.length === 0) {
        return <h3>Not Found</h3>;
    }

    function cardClick(event: React.MouseEvent<HTMLDivElement>) {
        console.log('clickkkkkkkkkkkkkkkkkkk');
        router.push(
            {
                pathname: router.pathname,
                query: { ...router.query, page, details: (event.target as HTMLElement).id },
            },
            undefined,
            { shallow: true }
        );
    }

    return (
        <div className={styles.cardField}>
            {reduxCardsData.data.map((card, index) => (
                <div className="card" key={index} data-testid="card">
                    <img
                        width="300px"
                        src={card.images.large}
                        data-testid="card-img"
                        id={card.id}
                        onClick={cardClick}
                    ></img>
                </div>
            ))}
        </div>
    );
}
