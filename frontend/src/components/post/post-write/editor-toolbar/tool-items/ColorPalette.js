import cn from 'classnames';
import { FaArrowRotateLeft, FaFont } from 'react-icons/fa6';
import styles from './tool-items.module.scss';

function hexToRgb(hex) {
  // #fff -> #ffffff
  let h = hex.replace('#', '');
  if (h.length === 3)
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  const bigint = parseInt(h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

function ColorPalette({ colors, type = 'text', onSet, onUnset }) {
  const typeFormat = {
    text: '텍스트 색상',
    bg: '배경 색상',
  };

  return (
    <div className={styles.palette}>
      <span className={styles.title}>{typeFormat[type]}</span>
      <div className={styles.wrap}>
        <button
          className={cn(styles.icon, styles.thumb)}
          type="button"
          onClick={() => onUnset()}
        >
          <FaArrowRotateLeft />
        </button>
        {colors.map((color, idx) => {
          let luma = 0;

          if (type !== 'text') {
            const [r, g, b] = hexToRgb(color);
            luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          }

          return (
            <button
              key={idx}
              className={cn(
                styles.icon,
                styles.thumb,
                type === 'text' && color === '#fff' ? styles.whiteText : ''
              )}
              style={{
                background: type === 'bg' ? color : 'transparent',
                color: type === 'bg' ? (luma <= 155 ? '#fff' : '#333') : color,
              }}
              type="button"
              onClick={() => onSet(color)}
            >
              <FaFont />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ColorPalette;
