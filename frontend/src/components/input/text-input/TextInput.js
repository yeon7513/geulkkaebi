import cn from 'classnames';
import styles from './TextInput.module.scss';

function TextInput({
  id = '',
  name = '',
  type = 'text',
  className,
  placeholder = ' ',
  ...props
}) {
  return (
    <div className={cn(styles.inputGroup, className)}>
      <input
        className={styles.input}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        {...props}
      />
      <span className={styles.inputBorder}></span>
    </div>
  );
}

export default TextInput;
