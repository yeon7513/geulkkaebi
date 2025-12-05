import cn from 'classnames';
import styles from './Tooltip.module.scss';

function Tooltip({ children, text, position = 'top', show = false }) {
  return (
    <div className={styles.tooltipWrapper}>
      {children}
      <span
        className={cn(styles.tooltip, styles[position], show && styles.show)}
      >
        {text}
      </span>
    </div>
  );
}

export default Tooltip;
