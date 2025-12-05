import cn from 'classnames';
import { formatGrade } from '../../utils/formatter';
import styles from './ProfileCard.module.scss';

function ProfileCard({ className, image, userId, nickname, grade }) {
  return (
    <div className={cn(className, styles.profile)}>
      <img src={image} alt={`${nickname} 프로필 사진`} />
      <div className={styles.member}>
        <div className={styles.userInfo}>
          <span className={styles.grade}>{formatGrade(grade)}</span>
          <span className={styles.nickname}>{nickname}</span>
        </div>
        <span className={styles.id}>{userId}</span>
      </div>
    </div>
  );
}

export default ProfileCard;
