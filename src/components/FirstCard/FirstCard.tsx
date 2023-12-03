import { useSelector } from 'react-redux';
import { FirstFormState } from '../../store/types';
import './FirstCard.css';

export function FirstCard() {
    const isDataLoaded = useSelector((state: FirstFormState) => state.firstForm.isDataLoaded);
    const nameData = useSelector((state: FirstFormState) => state.firstForm.name);
    const ageData = useSelector((state: FirstFormState) => state.firstForm.age);
    const genderData = useSelector((state: FirstFormState) => state.firstForm.gender);
    const emailData = useSelector((state: FirstFormState) => state.firstForm.email);
    const countryData = useSelector((state: FirstFormState) => state.firstForm.country);
    const passwordData = useSelector((state: FirstFormState) => state.firstForm.name);

    if (isDataLoaded === false) {
        return <div>Fill out the first form</div>;
    }

    return (
        <div className="card-content">
            <ul className="list-data">
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
            </ul>
        </div>
    );
}
