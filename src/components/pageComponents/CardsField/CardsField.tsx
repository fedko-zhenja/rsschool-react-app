import React from 'react';
import { CardsFieldProps, CardsFieldState } from '../../../types/types';
import './CardsField.css';

import { getCardsData } from '../../../api/PokemonApi';

export class CardsField extends React.Component<CardsFieldProps, CardsFieldState> {
    constructor(props: CardsFieldProps) {
        super(props);

        this.state = {
            inputValue: '',
            isDataLoaded: false,
            cardsData: {
                data: [],
                page: 0,
                pageSize: 0,
                count: 0,
                totalCount: 0,
            },
        };

        // getCardByValue('Ampharos').then((res) => {
        //     console.log(res);
        // });
    }

    getCardsData = async () => {
        try {
            const data = await getCardsData();
            this.setState({ cardsData: data, isDataLoaded: true });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    componentDidMount() {
        this.getCardsData();
    }

    render() {
        const { cardsData, isDataLoaded } = this.state;

        if (isDataLoaded === false) {
            return <div>Loading...</div>;
        }

        return (
            <div className="card-field">
                {cardsData.data.map((card, index) => (
                    <div className="card" key={index}>
                        <span>
                            Name: <span className="card-data">{card.name}</span>
                        </span>
                        {/* <p>Ability: {card.abilities?.[0]?.name}</p> */}
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
