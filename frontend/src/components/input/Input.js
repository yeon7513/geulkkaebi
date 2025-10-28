import cn from 'classnames';
import styles from './Input.module.scss';

function Input({
  id = '',
  name = '',
  type = 'text',
  className,
  placeholder = ' ',
  ...props
}) {
  const TextFieldTypes = ['text', 'password', 'email', 'search', 'tel'];
  const isTextField = TextFieldTypes.includes(type);

  return (
    <>
      {isTextField ? (
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
      ) : (
        <input
          className={styles.input}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          {...props}
        />
      )}
    </>
  );
}

export default Input;
