import cn from 'classnames';
import styles from './Container.module.scss';

function Container({ className, children }) {
  return <div className={cn(styles.container, className)}>{children}</div>;
}

export default Container;
