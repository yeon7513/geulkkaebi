import { useLocation, useNavigate } from 'react-router-dom';
import { useBoardFetch } from '../../hooks/useBoardFetch';
import PostList from './post-list/PostList';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../button/Button';
import { usePostNumbering } from './../../hooks/usePostNumbering';
import styles from './Post.module.scss';

import cn from 'classnames';
import { boardColors } from '../../lib/textIconLabel';
import Loader from '../loader/Loader';

function Post({ title, boardType }) {
  const { pathname } = useLocation();
  const [page, setPage] = useState(1);
  const size = 10;

  const { postList, totalPages, totalPosts, status } = useBoardFetch(
    null,
    boardType,
    page,
    size
  );

  const numberedPosts = usePostNumbering(
    postList || [],
    page,
    size,
    totalPosts
  );

  const { loginedUser } = useSelector((state) => state.userSlice);

  const navigate = useNavigate();

  if (status === 'loading' || status === 'waiting') {
    return <Loader title={title} text="게시판의 정보를 불러오고 있어요!" />;
  }

  return (
    <div className={styles.wrapper}>
      <h3>{title}</h3>
      <table className={styles.post}>
        <thead>
          <tr className={styles[boardColors[boardType]]}>
            <th>글 번호</th>
            <th>카테고리</th>
            <th>제목</th>
            <th>글쓴이</th>
            <th>작성일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {numberedPosts.length > 0 ? (
            numberedPosts.map((item, idx) => (
              <PostList key={idx} listData={item} num={item.displayNumber} />
            ))
          ) : (
            <tr>
              <td colSpan={6}>
                <div>게시글이 없습니다.</div>
              </td>
            </tr>
          )}
        </tbody>
        {totalPages !== 0 && (
          <tfoot>
            <tr>
              <td colSpan={6}>
                <div className={styles.pagination}>
                  <Button
                    className={styles.move}
                    variant="outline"
                    colors={boardColors[boardType]}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    이전
                  </Button>
                  <div className={styles.pageNumber}>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={
                          page === i + 1
                            ? cn(styles.active, styles[boardColors[boardType]])
                            : ''
                        }
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <Button
                    className={styles.move}
                    variant="outline"
                    colors={boardColors[boardType]}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    다음
                  </Button>
                </div>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
      {loginedUser &&
        (!pathname.includes('support') || loginedUser.adminYn === 1) && (
          <div className={styles.write}>
            <Button
              colors={boardColors[boardType]}
              onClick={() =>
                navigate('/write', { state: { boardType: boardType } })
              }
            >
              글쓰기
            </Button>
          </div>
        )}
    </div>
  );
}

export default Post;
