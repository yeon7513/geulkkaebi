import { useNavigate, useParams } from 'react-router-dom';
import styles from './PostListItem.module.scss';

import { useBoardFetch } from '../../../../hooks/useBoardFetch';
import Comment from '../../../comment/Comment';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike } from '../../../../utils/toggleLike';
import LikeButton from '../../../like-button/LikeButton';
import Loader from '../../../loader/Loader';

import { deletePost } from '../../../../store/board/postSlice';
import ControlButton from '../../../control-button/ControlButton';
import PostContent from './post-content/PostContent';
import PostHeader from './post-header/PostHeader';
import PostNavigation from './post-navigation/PostNavigation';

// 각 게시글 내용을 볼 수 있는 컴포넌트
function PostListItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { boardType, postNo } = useParams();

  const { loginedUser } = useSelector((state) => state.userSlice);

  // 단일 게시글 조회
  const { postItem, status, prevPost, nextPost } = useBoardFetch(
    postNo,
    boardType
  );

  const [post, setPost] = useState(null);

  // 좋아요 토글 핸들러
  const handleClickLike = async () => {
    if (!loginedUser) {
      alert('로그인이 필요합니다.');
      return;
    }

    const { liked, countLikes } = await toggleLike(
      'post',
      post.postNo,
      post.liked
    );

    setPost((prev) => ({
      ...prev,
      liked,
      countLikes,
    }));
  };

  // 게시글 삭제 핸들러
  const handleClickDelete = () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    dispatch(deletePost(postNo))
      .unwrap()
      .then(() => {
        alert('삭제되었습니다.');
        navigate(`/board/${boardType}`);
      })
      .catch(() => {
        alert('삭제 중 문제가 발생했습니다.');
      });
  };

  useEffect(() => {
    // postItem이 null이면 아무것도 하지 않음
    if (!postItem) return;
    setPost(postItem);
  }, [postItem]);

  if (!post || !postItem) {
    return <div>게시글이 존재하지 않습니다.</div>;
  }

  return (
    <div className={styles.postItem}>
      {/* 이전 및 다음글 네비게이션 */}
      <PostNavigation
        boardType={boardType}
        prevPost={prevPost}
        nextPost={nextPost}
      />
      <div className={styles.container}>
        {status === 'loading' || status === 'waiting' ? (
          <Loader
            className={styles.loading}
            text="게시글을 불러오는 중이에요!"
          />
        ) : (
          <>
            {/* 제목 */}
            <PostHeader post={post} />
            {/* 본문 */}
            <PostContent text={post.text} />
            {/* 수정, 삭제, 신고 버튼 */}
            <ControlButton
              isLogin={loginedUser}
              isWriter={post?.writer === loginedUser?.userId}
              onEdit={() => navigate(`/edit/${boardType}/${postNo}`)}
              onDelete={handleClickDelete}
            />
            {/* 좋아요 버튼 */}
            <LikeButton
              name="postLike"
              className={styles.likeBtn}
              count={post.countLikes}
              label={true}
              isLiked={post.liked}
              onChange={handleClickLike}
            />
          </>
        )}
      </div>
      {/* 댓글 리스트 */}
      {post.noticeYn === 0 && (
        <Comment postNo={post.postNo} boardType={boardType} />
      )}
    </div>
  );
}

export default PostListItem;
