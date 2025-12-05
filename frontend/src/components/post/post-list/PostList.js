import cn from 'classnames';
import styles from './PostList.module.scss';

import { RiMegaphoneLine } from 'react-icons/ri';
import TextIcon from '../../text-icon/TextIcon';

import { BsFillChatRightTextFill, BsFillSuitHeartFill } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import { boardColors, boardNames } from '../../../lib/textIconLabel';
import { formatCreatedAt, formatGrade } from '../../../utils/formatter';

function PostList({ num, listData }) {
  const { pathname } = useLocation();

  const isSupport = pathname.includes('support');

  return (
    <tr className={cn(styles.postList, num === 0 ? styles.notice : '')}>
      <td>{num === 0 ? <RiMegaphoneLine /> : num}</td>
      <td>
        <TextIcon colors={boardColors[listData.boardType]}>
          {boardNames[listData.boardType]}
        </TextIcon>
      </td>
      <td>
        <div className={styles.title}>
          <Link
            className={styles.titleText}
            to={`/${pathname.split('/')[1]}/${listData.boardType}/${
              listData.postNo
            }`}
          >
            {listData.title}
          </Link>
          {!isSupport && listData.noticeYn === 0 && (
            <div className={styles.icons}>
              <span className={cn(styles.icon, styles.comment)}>
                <BsFillChatRightTextFill color="#91c8e4" />
                {listData.countComments}
              </span>
              <span className={cn(styles.icon, styles.like)}>
                <BsFillSuitHeartFill color="#e43636" />
                {listData.countLikes}
              </span>
            </div>
          )}
        </div>
      </td>
      <td>
        <div className={styles.writer}>
          <span>{formatGrade(listData.grade)}</span>
          <span>{listData.nickname}</span>
        </div>
      </td>
      <td className={styles.date}>{formatCreatedAt(listData.createdAt)}</td>
      <td className={styles.hitcount}>{listData.hitcount}</td>
    </tr>
  );
}

export default PostList;
