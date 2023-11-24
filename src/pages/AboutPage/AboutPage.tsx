import styles from './AboutPage.module.css';

export const AboutPage = () => {
    return (
        <div className={styles.aboutWrapper}>
            <div className={styles.aboutInfo}>
                <h3>Welcome to our application!</h3>
                <p>
                    We are pleased to welcome you to the wonderful world of Pokemon. Our app is designed to help you
                    find all the information you need about your favorite Pokemon.
                </p>
                <p>
                    With our application you can easily find information about Pokemon, their types, characteristics,
                    abilities and much more.
                </p>
                <p>
                    No matter what level of experience you have in this world, our app will help you dive deeper into
                    the Pokemon universe. Thank you for choosing us, and welcome to an exciting adventure of finding and
                    exploring the world of Pokemon!
                </p>
            </div>
            <div className={styles.aboutImg} />
        </div>
    );
};
