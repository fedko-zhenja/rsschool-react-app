import styles from '../styles/NotFound.module.css';

function NotFound() {
    return (
        <div className={styles.notFoundWrapper}>
            <h2>Not Found...</h2>
            <div className={styles.notFoundImage} />
        </div>
    );
}

export default NotFound;
