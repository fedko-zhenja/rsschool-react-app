import { NavLink } from 'react-router-dom';
import { Path } from '../../path';
import '../NavBar/NavBar.css';

export const NavBar = () => {
    return (
        <div className="navigation-wrapper">
            <ul className="navigation-list">
                <li>
                    <NavLink to={Path.home} className="link_home">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to={Path.firstForm} className="link_first-form">
                        First form
                    </NavLink>
                </li>
                <li>
                    <NavLink to={Path.secondForm} className="link_second-form">
                        Second form
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};
