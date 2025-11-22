import cn from 'classnames';
import styles from './PostList.module.scss';

import { RiMegaphoneLine } from 'react-icons/ri';
import { formatCreatedAt } from '../../../utils/formatCreatedAt';
import TextIcon from '../../text-icon/TextIcon';

import { BsFillChatRightTextFill, BsFillSuitHeartFill } from 'react-icons/bs';

function PostList({ num, listData, themeColor, onClick }) {
  const categoryName = {
    debate: '토론마당',
    story: '스토리+',
    article: '도서 기자단',
    notice: '공지사항',
  };

  return (
    <div
      className={cn(
        styles.postList,
        styles[themeColor],
        listData.noticeYn === 1 ? styles.notice : '',
        listData.reportYn === 1 ? styles.warning : ''
      )}
      onClick={onClick}
    >
      <div className={styles.center}>
        {num === 0 ? <RiMegaphoneLine /> : num}
      </div>
      <div className={styles.center}>
        <TextIcon
          children={categoryName[listData.boardType]}
          colors={themeColor}
        />
      </div>
      <div className={styles.title}>
        <p className={styles.titleText}>{listData.title}</p>
        {listData.noticeYn === 0 && (
          <>
            <span className={cn(styles.icon, styles.comment)}>
              <BsFillChatRightTextFill />
              {listData.countComments}
            </span>
            <span className={cn(styles.icon, styles.like)}>
              <BsFillSuitHeartFill />
              {listData.countLikes}
            </span>
          </>
        )}
      </div>
      <div className={styles.center}>{listData.nickname}</div>
      <div className={styles.center}>{formatCreatedAt(listData.createdAt)}</div>
      <div className={styles.center}>{listData.hitcount}</div>
    </div>
  );
}

export default PostList;
