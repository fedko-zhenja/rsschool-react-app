import { NavLink } from 'react-router-dom';
import { Path } from '../../path';
import styles from './NavBar.module.css';
// import './NavBar.css';

export const NavBar = () => {
    return (
        <div className={styles.navigationWrapper}>
            <h1 className={styles.title}>Pokémon</h1>
            <ul className={styles.navigationList}>
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
