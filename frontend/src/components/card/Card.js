import cn from 'classnames';
import styles from './Card.module.scss';

function Card({ className, children, isPointer = true, onClick = '' }) {
  return (
    <div
      className={cn(styles.card, className, isPointer ? styles.pointer : '')}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Card;
