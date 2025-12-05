import cn from 'classnames';
import styles from './Card.module.scss';

function Card({ className, children, isPointer = true, onClick }) {
  const clickProps = isPointer && onClick ? { onClick } : {};

  return (
    <div
      className={cn(styles.card, className, isPointer ? styles.pointer : '')}
      {...clickProps}
    >
      {children}
    </div>
  );
}

export default Card;
