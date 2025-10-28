import cn from 'classnames';
import styles from './Card.module.scss';

function Card({ className, children, isPointer = true }) {
  return (
    <div
      className={cn(styles.card, className, isPointer ? styles.pointer : '')}
    >
      {children}
    </div>
  );
}

export default Card;
