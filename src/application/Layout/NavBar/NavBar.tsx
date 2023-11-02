import { NavLink } from 'react-router-dom';
import { Path } from '../../path';
// import { CardsPage } from '../../../components/pages/CardsPage/CardsPage';

export const NavBar = () => {
    return (
        <ul>
            <li>
                <NavLink to={Path.cardsPage}>Cards</NavLink>
            </li>
            <li>
                <NavLink to={Path.about}>About</NavLink>
            </li>
        </ul>
    );
};
