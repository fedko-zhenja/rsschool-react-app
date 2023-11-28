import { useParams } from 'react-router-dom';
import { useEffect, useCallback, useState } from 'react';
import { AdditionalCardsInfoState } from '../types/types';
import { useGetCardByIdQuery } from '../lib/PokemonApi';
import { useRouter } from 'next/router';
import styles from '../styles/AdditionalCardsInfo.module.css';

export function AdditionalCardsInfo() {
    const [isCardWindowOpen, setIsCardWindowOpen] = useState<AdditionalCardsInfoState['isCardWindowOpen']>(false);
    const [cardData, setCardData] = useState<AdditionalCardsInfoState['cardData']>({
        data: {
            name: '',
            hp: '',
            level: '',
            attacks: [],
        },
    });

    const router = useRouter();
    const { page, details } = router.query;

    const params = useParams();

    const { data, isFetching } = useGetCardByIdQuery(String(details) || '');

    const getDataFromApi = useCallback(() => {
        try {
            setIsCardWindowOpen(true);

            if (data) {
                setCardData(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [data]);

    useEffect(() => {
        getDataFromApi();
    }, [params, getDataFromApi]);

    const handleCloseWindow = () => {
        router.push(
            {
                pathname: router.pathname,
                query: { page },
            },
            undefined,
            { shallow: true }
        );
        setIsCardWindowOpen(false);
    };

    if (isCardWindowOpen === false) {
        return null;
    }

    if (isFetching) {
        return (
            <div className={styles.additionalDataWrapper} data-testid="additional-data">
                <div className={styles.additionalDataContent}>
                    <button className={styles.closeBtn} onClick={handleCloseWindow}>
                        X
                    </button>
                    <div className={styles.pokemonData}>
                        <h4>Loading...</h4>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.additionalDataWrapper} data-testid="additional-data">
            <div className={styles.additionalDataContent}>
                <button className={styles.closeBtn} onClick={handleCloseWindow}>
                    X
                </button>
                <div className={styles.pokemonData}>
                    <p>
                        Name:
                        <span className={styles.fieldValue}> {cardData.data.name}</span>
                    </p>
                    <p>
                        Health power:
                        <span className={styles.fieldValue}> {cardData.data.hp ? cardData.data.hp : 'none'}</span>
                    </p>
                    <p>
                        Level:
                        <span className={styles.fieldValue}> {cardData.data.level ? cardData.data.level : 'none'}</span>
                    </p>
                    <p>
                        Attacks:&nbsp;
                        <span className={styles.fieldValue}>
                            {cardData.data.attacks?.[0] ? cardData.data.attacks?.[0].name : 'none'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
