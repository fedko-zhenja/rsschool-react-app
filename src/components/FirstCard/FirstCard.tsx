import { useSelector } from 'react-redux';
import { FirstFormState } from '../../store/types';
import './FirstCard.css';

// interface state {
//     firstForm: FirstFormState;
//     history: Array<FirstFormState>;
// }

export function FirstCard() {
    const isDataLoaded = useSelector((state: FirstFormState) => state.firstForm.isDataLoaded);
    // const nameData = useSelector((state: FirstFormState) => state.firstForm.name);
    // const ageData = useSelector((state: FirstFormState) => state.firstForm.age);
    // const genderData = useSelector((state: FirstFormState) => state.firstForm.gender);
    // const emailData = useSelector((state: FirstFormState) => state.firstForm.email);
    // const countryData = useSelector((state: FirstFormState) => state.firstForm.country);
    // const passwordData = useSelector((state: FirstFormState) => state.firstForm.password);
    // const pictureData = useSelector((state: FirstFormState) => state.firstForm.picture);

    const cardsData = useSelector((state: FirstFormState) => state.history);

    // console.log(
    //     'data history',
    //     useSelector((state) => state)
    // );

    if (isDataLoaded === false) {
        return <div>Fill out the form</div>;
    }

    return (
        <div className="cards-wrapper">
            {/* <ul className="list-data">
                <li>
                    <img width={250} height={250} src={`data:image/png;base64,${pictureData}`} alt="" />
                </li>
                <li>
                    Name: <span>{nameData}</span>
                </li>
                <li>
                    Age: <span>{ageData}</span>
                </li>
                <li>
                    Gender: <span>{genderData}</span>
                </li>
                <li>
                    Email: <span>{emailData}</span>
                </li>
                <li>
                    Country: <span>{countryData}</span>
                </li>
                <li>
                    Password: <span>{passwordData}</span>
                </li>
            </ul> */}
            {cardsData.map((card, index: number) => (
                <div key={index} className="card-content">
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
