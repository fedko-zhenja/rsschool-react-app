import { NavLink } from 'react-router-dom';
import { Path } from '../../path';
import './NavBar.css';

export const NavBar = () => {
    return (
        <div className="navigation-wrapper">
            <h1 className="title">Pokémon</h1>
            <ul className="navigation-list">
                <li>
                    <NavLink to={Path.cardsPage}>Cards</NavLink>
                </li>
                <li>
                    <NavLink to={Path.about}>About</NavLink>
                </li>
            </ul>
        </div>
    );
};
