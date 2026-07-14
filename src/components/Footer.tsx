import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Pierre van Ryneveld Athletics Club. All rights reserved.</p>
      <p className={styles.tagline}>Where Every Run Takes Flight ✈️</p>
    </footer>
  );
}
