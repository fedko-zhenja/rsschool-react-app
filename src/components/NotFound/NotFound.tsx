import styles from './NotFound.module.css';

export function NotFound() {
    return (
        <div className={styles.notFoundWrapper}>
            <h3>Not Found!</h3>
            <div className={styles.notFoundImage} />
        </div>
    );
}
