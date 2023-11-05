import { useLoaderData } from 'react-router-dom';
import './AdditionalCardsInfo.css';

export interface LoadedData {
    data: {
        name: string;
        hp: string;
        level: string;
    };
}

export function AdditionalCardsInfo() {
    const data: LoadedData = useLoaderData();
    console.log(data);
    return (
        <div className="additional-data">
            <p>Name: {data.data.name}</p>
            <p>HP: {data.data.hp}</p>
            <p>Level: {data.data.level}</p>
        </div>
    );
}
