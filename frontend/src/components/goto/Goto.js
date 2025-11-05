import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { goto } from '../../lib/goto';
import Button from '../button/Button';
import styles from './Goto.module.scss';

function Goto({ className, isScroll = false, isFooter = false, onClickToTop }) {
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.label === 'TOP') {
      onClickToTop?.();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div
      className={cn(
        styles.goto,
        isScroll && styles.show,
        isFooter && styles.stop,
        className
      )}
    >
      {goto.map((item, idx) => (
        <Button colors={item.color} key={idx} onClick={() => handleClick(item)}>
          {item.label}
        </Button>
      ))}
    </div>
  );
}

export default Goto;
