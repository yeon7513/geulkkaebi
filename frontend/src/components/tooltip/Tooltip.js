import cn from 'classnames';
import styles from './Tooltip.module.scss';

function Tooltip({ children, text, position = 'top' }) {
  return (
    <div className={styles.tooltipWrapper}>
      {children}
      <span className={cn(styles.tooltip, styles[position])}>{text}</span>
    </div>
  );
}

export default Tooltip;
