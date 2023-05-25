import styles from "./Footer.module.css"

function Footer() {
    return (
        <footer className={styles.footer}>
            <p>created with <img src="footer-burger.png" /> by &nbsp;<a href="https://github.com/caoimvin" title="Visit me on GitHub">caoimvin</a></p>
        </footer>
    )
}

export default Footer