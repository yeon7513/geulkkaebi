import cn from 'classnames';
import styles from './CheckBox.module.scss';

function CheckBox({
  className,
  label,
  id = '',
  name = '',
  onChange = null,
  checked,
}) {
  return (
    <div className={cn(styles.wrapper, className)}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className={styles.chkBox}
      />
      <label htmlFor={id} className={styles.label}>
        <span>
          <svg viewBox="0 0 12 10" height="10px" width="12px">
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
          </svg>
        </span>
        <span>{label}</span>
      </label>
    </div>
  );
}

export default CheckBox;
