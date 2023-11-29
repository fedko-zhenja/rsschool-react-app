import styles from '../styles/NavBar.module.css';
import Link from 'next/link';
import { Path } from '../types/path';
import { useRouter } from 'next/router';

function NavBar() {
    const { pathname } = useRouter();

    return (
        <div className={styles.navigationWrapper}>
            <h1 className={styles.title}>Pokémon</h1>
            <ul className={styles.navigationList}>
                <li>
                    <Link href={Path.cards} className={pathname === Path.cards ? styles.active : undefined}>
                        Cards
                    </Link>
                </li>
                <li>
                    <Link href={Path.about} className={pathname === Path.about ? styles.active : undefined}>
                        About
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default NavBar;
