import cn from 'classnames';
import styles from './LikeButton.module.scss';

function LikeButton({ className, name, count, label, isLiked, onChange }) {
  return (
    <div className={cn(className, styles.wrap)}>
      <label className={styles.container}>
        <input
          name={name}
          type="checkbox"
          checked={isLiked}
          onChange={onChange}
        />
        <div className={styles.checkMark}>
          <svg viewBox="0 0 256 256">
            <rect fill="none" height="256" width="256"></rect>
            <path
              d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
              strokeWidth="16px"
              fill="#e6e6e6"
            ></path>
          </svg>
        </div>
        {label && (
          <span className={isLiked ? styles.checkLike : styles.label}>
            좋아요
          </span>
        )}
        <span className={styles.count}>{count}</span>
      </label>
    </div>
  );
}

export default LikeButton;
