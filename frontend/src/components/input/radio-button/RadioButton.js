import cn from 'classnames';
import styles from './RadioButton.module.scss';

function RadioButton({ className, children, name = '', value = '' }) {
  return (
    <label className={cn(styles.radioButton, className)}>
      <input type="radio" name={name} value={value} />
      <div className={styles.radioCircle}></div>
      <span className={styles.radioLabel}>{children}</span>
    </label>
  );
}

export default RadioButton;
