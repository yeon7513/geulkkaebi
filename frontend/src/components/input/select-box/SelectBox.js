import cn from 'classnames';
import { useState } from 'react';
import styles from './SelectBox.module.scss';

function SelectBox({ name = '', className, children, ...props }) {
  const [filled, setFilled] = useState(false);

  return (
    <div
      className={cn(styles.selectGroup, filled ? styles.filled : '', className)}
    >
      <select
        name={name}
        className={styles.select}
        onChange={(e) => setFilled(e.target.value !== '')}
        {...props}
      >
        {children}
      </select>
      <span className={styles.selectBorder}></span>
    </div>
  );
}

export default SelectBox;
