import cn from 'classnames';
import { PacmanLoader } from 'react-spinners';
import styles from './Loader.module.scss';

function Loader({ className, title, text }) {
  return (
    <div className={cn(className, styles.loading)}>
      {title && <h3>{title}</h3>}
      <div className={styles.loader}>
        <div>
          <PacmanLoader color="#cccccc" />
        </div>
        {text}
      </div>
    </div>
  );
}

export default Loader;
