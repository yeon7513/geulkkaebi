import { BiSolidChevronLeft, BiSolidChevronRight } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import styles from './PostNavigation.module.scss';

function PostNavigation({ boardType, prevPost, nextPost }) {
  const navigate = useNavigate();

  return (
    <div className={styles.nav}>
      {prevPost ? (
        <button
          onClick={() => navigate(`/board/${boardType}/${prevPost.postNo}`)}
        >
          <BiSolidChevronLeft />
          <span>{prevPost.title}</span>
        </button>
      ) : (
        <p>이전 글이 없습니다.</p>
      )}
      {nextPost ? (
        <button
          onClick={() => navigate(`/board/${boardType}/${nextPost.postNo}`)}
        >
          <span>{nextPost.title}</span>
          <BiSolidChevronRight />
        </button>
      ) : (
        <p>다음 글이 없습니다.</p>
      )}
    </div>
  );
}

export default PostNavigation;
