import styles from './ui.module.scss';

function Loading(props) {
    return (
        <main className={styles.main}>
            <div className={styles.loader}></div>
        </main>
    );
}

export default Loading;