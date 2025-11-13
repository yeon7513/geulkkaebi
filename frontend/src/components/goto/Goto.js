import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { goto } from '../../lib/goto';
import Button from '../button/Button';
import Tooltip from '../tooltip/Tooltip';
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
        <Tooltip key={idx} text={item.label} position="left">
          <Button colors={item.color} onClick={() => handleClick(item)}>
            {item.label}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}

export default Goto;
