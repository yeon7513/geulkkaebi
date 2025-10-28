import cn from 'classnames';
import styles from './Button.module.scss';

function Button({
  className,
  type = 'button',
  colors = 'green',
  variant = 'fill',
  isRound = false,
  onClick,
  children,
}) {
  const btnColors = {
    green: styles.green,
    gray: styles.gray,
    mint: styles.mint,
    purple: styles.purple,
    yellow: styles.yellow,
    orange: styles.orange,
  };

  const btnStyles = {
    pushable: styles.pushable,
    fill: styles.fill,
    outline: styles.outline,
  };

  return (
    <button
      className={cn(
        styles.btn,
        isRound && styles.round,
        btnStyles[variant],
        className,
        btnColors[colors]
      )}
      type={type}
      onClick={onClick}
    >
      {variant === 'pushable' ? (
        <>
          <span className={styles.shadow}></span>
          <span className={styles.edge}></span>
          <span className={styles.front}>{children}</span>
        </>
      ) : (
        <>{children}</>
      )}
    </button>
  );
}

export default Button;
