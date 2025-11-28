import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useBoardFetch } from '../../../../hooks/useBoardFetch';
import { incrementHitcount } from '../../../../store/board/postSlice';
import styles from './PostListItem.module.scss';

import placeholder from '../../../../assets/img/no_images.png';
import { formatGrade } from '../../../../utils/formatGrade';
import Comment from '../../../comment/Comment';

// 각 게시글 내용을 볼 수 있는 컴포넌트
function PostListItem() {
  const { boardType, postNo } = useParams();
  const { post, status } = useBoardFetch(boardType, postNo);
  const dispatch = useDispatch();

  const postItem = post.find((p) => p.postNo === Number(postNo));

  useEffect(() => {
    if (postNo) {
      dispatch(incrementHitcount(Number(postNo)));
    }
  }, [dispatch, postNo]);

  if (status === 'loading' || status === 'waiting') {
    return <div>게시글 정보를 불러오고 있어요!</div>;
  }
  if (!postItem) {
    return <div>게시글이 존재하지 않습니다.</div>;
  }

  return (
    <div className={styles.postItem}>
      <div className={styles.header}>
        <h3>{postItem.title}</h3>
        <div className={styles.writer}>
          <img
            className={styles.profile}
            src={postItem.profileImg || placeholder}
            alt=""
          />
          <span>
            {formatGrade(postItem.grade)}
            {postItem.nickname}
          </span>
        </div>
        <div>
          <ul>
            <li>{postItem.createdAt}</li>
            <li>{postItem.hitcount}</li>
          </ul>
        </div>
      </div>
      <div
        className={styles.text}
        dangerouslySetInnerHTML={{ __html: postItem.text }}
      />
      <div>
        <Comment postNo={postItem.postNo} />
      </div>
    </div>
  );
}

export default PostListItem;
