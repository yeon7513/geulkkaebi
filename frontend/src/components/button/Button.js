import cn from 'classnames';
import styles from './Button.module.scss';

function Button({ className, type, onClick, children }) {
  const btnStyle = (style) => {
    switch (style) {
      case 'primary':
        return styles.primary;
      case 'secondary':
        return styles.secondary;
      case 'success':
        return styles.success;
      case 'info':
        return styles.info;
      case 'warning':
        return styles.warning;
      case 'danger':
        return styles.danger;
      case 'round':
        return styles.round;
      default:
        return styles.primary;
    }
  };

  return (
    <button
      className={cn(styles.pushable, className, btnStyle(type))}
      onClick={onClick}
    >
      <span className={styles.shadow}></span>
      <span className={styles.edge}></span>
      <span className={styles.front}>{children}</span>
    </button>
  );
}

export default Button;
