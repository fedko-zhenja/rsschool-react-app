import { useParams } from 'react-router-dom';
import { useEffect, useCallback, useState } from 'react';
import { AdditionalCardsInfoState } from './type';
import { useGetCardByIdQuery } from '../../../../api/PokemonApi';
import './AdditionalCardsInfo.css';

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

    const params = useParams();

    const { data, isLoading } = useGetCardByIdQuery(params.index || '');

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
        const currentURL = window.location.href;
        const updatedURL = currentURL.replace(`/details/${params.index}`, '');
        window.history.pushState({}, '', updatedURL);

        setIsCardWindowOpen(false);
    };

    if (isCardWindowOpen === false) {
        return null;
    }

    if (isLoading) {
        return (
            <div className="additional-data_wrapper" data-testid="additional-data">
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
        <div className="additional-data_wrapper" data-testid="additional-data">
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
            </div>
        </div>
    );
}
