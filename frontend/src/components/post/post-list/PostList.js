import cn from 'classnames';
import styles from './PostList.module.scss';

import { RiMegaphoneLine } from 'react-icons/ri';
import { formatCreatedAt } from '../../../utils/formatCreatedAt';
import TextIcon from '../../text-icon/TextIcon';

import { BsFillChatRightTextFill, BsFillSuitHeartFill } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';

function PostList({ num, listData }) {
  const { pathname } = useLocation();

  const categoryName = {
    debate: '토론마당',
    story: '스토리+',
    article: '도서 기자단',
    notice: '공지사항',
  };

  const themeColors = {
    debate: 'green',
    story: 'purple',
    article: 'orange',
  };

  return (
    <tr className={num === 0 ? styles.notice : ''}>
      <td>{num === 0 ? <RiMegaphoneLine /> : num}</td>
      <td>
        <TextIcon
          children={categoryName[listData.boardType]}
          colors={themeColors[listData.boardType]}
        />
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
      </td>
      <td>{listData.nickname}</td>
      <td>{formatCreatedAt(listData.createdAt)}</td>
      <td>{listData.hitcount}</td>
    </tr>
  );
}

export default PostList;
