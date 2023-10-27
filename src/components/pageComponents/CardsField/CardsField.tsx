import React from 'react';
import { CardsFieldProps, CardsFieldState } from '../../../types/types';
import './CardsField.css';

// import { getCardsData, getCardByValue } from '../../../api/PokemonApi';

export class CardsField extends React.Component<CardsFieldProps, CardsFieldState> {
    constructor(props: CardsFieldProps) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            img: [],
            description: [],
        };

        // console.log(
        //     getCardsData().then((res) => {
        //         console.log(res);
        //     })
        // );

        // console.log(
        //     getCardByValue('Ampharos').then((res) => {
        //         console.log(res);
        //     })
        // );
    }

    // getCardsData = async () => {
    //     try {
    //         const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }

    //         const result = await response.json();

    //         this.setState({
    //             isLoaded: true,
    //             items: result.results,
    //         });

    //         const arrImg = this.state.items.map((el, index) => {
    //             return (
    //                 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + (index + 1) + '.png'
    //             );
    //         });

    //         this.setState({ img: arrImg });
    //     } catch (error) {
    //         this.setState({
    //             isLoaded: true,
    //             error: error as Error,
    //         });
    //     }

    //     try {
    //         const response = await fetch('https://pokeapi.co/api/v2/ability');
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }

    //         const result = await response.json();

    //         this.setState({
    //             isLoaded: true,
    //             description: result.results,
    //         });
    //     } catch (error) {
    //         this.setState({
    //             isLoaded: true,
    //             error: error as Error,
    //         });
    //     }
    // };

    // componentDidMount(): void {
    //     this.getCardsData();
    // }

    render() {
        // const { error, isLoaded, items, img, description } = this.state;

        // if (description.length === 0) {
        //     return <p>Loading2...</p>;
        // }

        // if (error) {
        //     return <p>Error {error.message}</p>;
        // }

        // if (!isLoaded) {
        //     return <p>Loading...</p>;
        // }

        return (
            <div className="card-field">
                {/* {items.map((item, index) => (
                    <div className="card" key={item.name}>
                        <p>Name: {item.name}</p>
                        <p>Ability: {description[index].name}</p>
                        <img width="120px" src={img[index]}></img>
                    </div>
                ))} */}
            </div>
        );
    }
}
