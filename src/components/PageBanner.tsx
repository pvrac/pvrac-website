import styles from './PageBanner.module.css';

type PageBannerProps = {
  title: string;
  subtitle?: string;
};

export default function PageBanner({ title, subtitle }: PageBannerProps) {
  return (
    <div className={styles.banner}>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
