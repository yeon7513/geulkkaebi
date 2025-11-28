import { useNavigate } from 'react-router-dom';
import { useBoardFetch } from '../../hooks/useBoardFetch';
import PostList from './post-list/PostList';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../button/Button';
import { usePostNumbering } from './../../hooks/usePostNumbering';
import styles from './Post.module.scss';

function Post({ title, boardType }) {
  const [page, setPage] = useState(1);
  const size = 10;

  console.log();

  const { post, totalPages, totalPosts, status } = useBoardFetch(
    boardType,
    null,
    null,
    false,
    page,
    size
  );

  const numberedPosts = usePostNumbering(post || [], page, size, totalPosts);

  const { loginedUser } = useSelector((state) => state.userSlice);

  const navigate = useNavigate();

  if (status === 'loading' || status === 'waiting') {
    return <div>게시글 정보를 불러오고 있어요!</div>;
  }

  return (
    <div className={styles.wrapper}>
      <h3>{title}</h3>
      <table border={1} className={styles.post}>
        <thead>
          <tr>
            <th>글 번호</th>
            <th>카테고리</th>
            <th>제목</th>
            <th>글쓴이</th>
            <th>작성일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {numberedPosts.map((item, idx) => (
            <PostList key={idx} listData={item} num={item.displayNumber} />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>
              <div className={styles.pagination}>
                <Button
                  className={styles.move}
                  variant="outline"
                  colors="yellow"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  이전
                </Button>
                <div className={styles.pageNumber}>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={page === i + 1 ? styles.active : ''}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <Button
                  className={styles.move}
                  variant="outline"
                  colors="yellow"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  다음
                </Button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      {!loginedUser && (
        <div className={styles.write}>
          <Button onClick={() => navigate(`/write/${boardType}`)}>
            글쓰기
          </Button>
        </div>
      )}
    </div>
  );
}

export default Post;
