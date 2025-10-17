import cn from 'classnames';
import styles from './ImageBox.module.scss';

function ImageBox({ className, src, alt }) {
  return <img className={cn(styles.imgBox, className)} src={src} alt={alt} />;
}

export default ImageBox;
