import cn from 'classnames';
import styles from './ImageBox.module.scss';

function ImageBox({ className, src, alt, ...props }) {
  return (
    <img
      className={cn(styles.imgBox, className)}
      src={src}
      alt={alt}
      {...props}
    />
  );
}

export default ImageBox;
