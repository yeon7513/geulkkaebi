import { useNavigate } from 'react-router-dom';
import { useBoardFetch } from '../../hooks/useBoardFetch';
import { usePostNumbering } from '../../hooks/usePostNumbering';
import PostList from './post-list/PostList';

import styles from './Post.module.scss';

function Post({ title, boardType, themeColor = 'green' }) {
  const { post, status } = useBoardFetch(boardType);
  const numberedPosts = usePostNumbering(post);

  const navigate = useNavigate();

  if (status === 'loading' || status === 'waiting') {
    return <div>게시글 정보를 불러오고 있어요!</div>;
  }

  return (
    <div className={styles.wrapper}>
      <h3>{title}</h3>
      {/* <div>
        <th>글 번호</th>
        <th>제목</th>
        <th>글쓴이</th>
        <th>작성일</th>
        <th>조회수</th>
      </div> */}
      {numberedPosts.map((item, idx) => (
        <PostList
          key={idx}
          listData={item}
          themeColor={themeColor}
          num={item.displayNumber}
          onClick={() => navigate(`/board/${item.boardType}/${item.postNo}`)}
        />
      ))}
      <div>
        <button onClick={() => navigate(`/write/${boardType}`)}>글쓰기</button>
      </div>
    </div>
  );
}

export default Post;
