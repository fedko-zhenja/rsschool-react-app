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
            <div>
                {cardsData.data.map((card, index) => (
                    <div key={index}>{card.name}</div>
                ))}
            </div>
        );
    }
}
