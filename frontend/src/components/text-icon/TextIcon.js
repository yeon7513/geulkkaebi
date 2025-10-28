import cn from 'classnames';
import styles from './TextIcon.module.scss';

function TextIcon({ className, children, colors = 'green' }) {
  const iconColors = {
    green: styles.green,
    gray: styles.gray,
    mint: styles.mint,
    purple: styles.purple,
    yellow: styles.yellow,
    orange: styles.orange,
  };

  return (
    <span className={cn(styles.textIcon, iconColors[colors], className)}>
      {children}
    </span>
  );
}

export default TextIcon;
