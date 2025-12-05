import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextIcon from '../../../../components/text-icon/TextIcon';
import { fetchAllPostData } from '../../../../store/board/postSlice';
import { STATUS } from '../../../../store/common/commoms';
import styles from './SupportList.module.scss';

function SupportList({ boardType }) {
  const { postList, status } = useSelector((state) => state.postSlice);
  const dispatch = useDispatch();

  const [noticeList, setNoticeList] = useState([]);
  const [eventList, setEventList] = useState([]);

  const iconColors = {
    notice: 'green',
    event: 'yellow',
  };

  const iconLabel = {
    notice: '공지사항',
    event: '이벤트',
  };

  useEffect(() => {
    dispatch(fetchAllPostData({ boardType: 'notice', page: 1, size: 5 }))
      .unwrap()
      .then((data) => setNoticeList(data.postList))
      .catch((err) => console.log(err));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllPostData({ boardType: 'event', page: 1, size: 5 }))
      .unwrap()
      .then((data) => setEventList(data.postList))
      .catch((err) => console.log(err));
  }, [dispatch]);

  const filteredList = boardType === 'notice' ? noticeList : eventList;

  if (status === STATUS.LOADING) {
    return <div>정보를 불러오는 중입니다.</div>;
  }

  if (postList.length <= 0) {
    return <div>게시글의 정보가 없습니다.</div>;
  }

  return (
    <ul className={styles.list}>
      {filteredList.map((post) => (
        <li key={post.postNo}>
          <Link to={`/support/${post.boardType}/${post.postNo}`}>
            <div className={styles.contents}>
              <div className={styles.title}>
                <TextIcon colors={iconColors[boardType]}>
                  {iconLabel[boardType]}
                </TextIcon>
                <p>{post.title}</p>
              </div>
              <span className={styles.date}>{post.createdAt}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SupportList;
