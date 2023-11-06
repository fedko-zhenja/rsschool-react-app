import { useParams } from 'react-router-dom';
import './AdditionalCardsInfo.css';
import { useEffect, useCallback, useState } from 'react';
import { getCardDataById } from '../../../../api/PokemonApi';
import { AdditionalCardsInfoState } from './type';

export function AdditionalCardsInfo() {
    const [isDataLoaded, setIsDataLoaded] = useState<AdditionalCardsInfoState['isDataLoaded']>(false);
    const [cardData, setCardData] = useState<AdditionalCardsInfoState['cardData']>({
        data: {
            name: '',
            hp: '',
            level: '',
            attacks: [],
        },
    });

    const params = useParams();

    const getDataFromApi = useCallback(async (index: string): Promise<void> => {
        try {
            setIsDataLoaded(false);

            const data = await getCardDataById(index);

            setCardData(data);
            setIsDataLoaded(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    useEffect(() => {
        getDataFromApi(params.index || '');
    }, [params, getDataFromApi]);

    const handleCloseWindow = () => {
        window.location.href = '/';
    };

    if (isDataLoaded === false) {
        return (
            <div className="additional-data_wrapper">
                <div className="additional-data_content">
                    <button className="close-btn" onClick={handleCloseWindow}>
                        X
                    </button>
                    <h4>Loading...</h4>
                </div>
            </div>
        );
    }

    return (
        <div className="additional-data_wrapper">
            <div className="additional-data_content">
                <button className="close-btn" onClick={handleCloseWindow}>
                    X
                </button>
                <p>
                    Name:
                    <span className="field-value"> {cardData.data.name}</span>
                </p>
                <p>
                    Health power:
                    <span className="field-value"> {cardData.data.hp ? cardData.data.hp : 'none'}</span>
                </p>
                <p>
                    Level:
                    <span className="field-value"> {cardData.data.level ? cardData.data.level : 'none'}</span>
                </p>
                <p>
                    Attacks:&nbsp;
                    <span className="field-value">
                        {cardData.data.attacks?.[0] ? cardData.data.attacks?.[0].name : 'none'}
                    </span>
                </p>
                <p>
                    Damage:&nbsp;
                    <span className="field-value">
                        {cardData.data.attacks?.[0].damage ? cardData.data.attacks?.[0].damage : 'none'}
                    </span>
                </p>
            </div>
        </div>
    );
}
