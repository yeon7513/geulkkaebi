import cn from 'classnames';
import { goto } from '../../lib/goto';
import Button from '../button/Button';
import styles from './Goto.module.scss';

function Goto({ className, isColumn = false, isScroll = false }) {
  return (
    <div
      className={cn(
        styles.goto,
        isColumn && styles.column,
        isScroll && styles.fixed,
        className
      )}
    >
      {goto.map((item, idx) => (
        <Button colors={item.color} key={idx}>
          {isScroll ? <>icons</> : <>{item.label}</>}
        </Button>
      ))}
    </div>
  );
}

export default Goto;
