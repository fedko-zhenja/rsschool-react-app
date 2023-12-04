import { useSelector } from 'react-redux';
import { FirstFormState } from '../../store/types';
import './FirstCard.css';

export function FirstCard() {
    const isDataLoaded = useSelector((state: FirstFormState) => state.firstForm.isDataLoaded);
    const cardsData = useSelector((state: FirstFormState) => state.history);

    if (isDataLoaded === false) {
        return <div>Fill out the form</div>;
    }

    return (
        <div className="cards-wrapper">
            {cardsData.map((card, index: number) => (
                <div key={index} className={`card-content ${cardsData.length - 1 === index ? 'animated' : ''}`}>
                    <ul className="list-data">
                        <li>
                            <img width={250} height={250} src={`data:image/png;base64,${card.picture}`} alt="" />
                        </li>
                        <li>
                            Name: <span>{card.name}</span>
                        </li>
                        <li>
                            Age: <span>{card.age}</span>
                        </li>
                        <li>
                            Gender: <span>{card.gender}</span>
                        </li>
                        <li>
                            Email: <span>{card.email}</span>
                        </li>
                        <li>
                            Country: <span>{card.country}</span>
                        </li>
                        <li>
                            Password: <span>{card.password}</span>
                        </li>
                    </ul>
                </div>
            ))}
        </div>
    );
}
