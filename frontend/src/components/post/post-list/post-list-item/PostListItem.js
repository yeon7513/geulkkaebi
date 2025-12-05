import { useNavigate, useParams } from 'react-router-dom';
import styles from './PostListItem.module.scss';

import { useBoardFetch } from '../../../../hooks/useBoardFetch';
import Comment from '../../../comment/Comment';

import { useEffect, useState } from 'react';
import { BiSolidChevronLeft, BiSolidChevronRight } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { boardColors, boardNames } from '../../../../lib/textIconLabel';
import { toggleLike } from '../../../../utils/toggleLike';
import LikeButton from '../../../like-button/LikeButton';
import Loader from '../../../loader/Loader';
import ProfileCard from '../../../profile-card/ProfileCard';
import TextIcon from '../../../text-icon/TextIcon';

import placeholder from '../../../../assets/img/no_images.png';
import ControlButton from '../../../control-button/ControlButton';

// 각 게시글 내용을 볼 수 있는 컴포넌트
function PostListItem() {
  const navigate = useNavigate();
  const { boardType, postNo } = useParams();

  const { loginedUser } = useSelector((state) => state.userSlice);

  // 단일 게시글 조회
  const { postItem, status, prevPost, nextPost } = useBoardFetch(
    postNo,
    boardType
  );

  const [post, setPost] = useState(null);

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
      <div className={styles.container}>
        {status === 'loading' || status === 'waiting' ? (
          <Loader
            className={styles.loading}
            text="게시글을 불러오는 중이에요!"
          />
        ) : (
          <>
            <div className={styles.header}>
              {/* 게시글 제목 */}
              <div className={styles.title}>
                <TextIcon colors={boardColors[post.boardType]}>
                  {boardNames[post.boardType]}
                </TextIcon>
                <h3>{post.title}</h3>
              </div>
              <div className={styles.writer}>
                {/* 작성자 정보 */}
                <ProfileCard
                  image={post?.profileImg || placeholder}
                  userId={post.writer}
                  nickname={post.nickname}
                  grade={post.grade}
                />
                <ul className={styles.postInfo}>
                  {/* 작성일 */}
                  <li>
                    <span>작성</span>
                    {post.createdAt}
                  </li>
                  {post.modifiedAt !== null && (
                    <li>
                      <span>수정</span>
                      {post.modifiedAt}
                    </li>
                  )}
                  {/* 조회수 */}
                  <li>
                    <span>조회수</span>
                    {post.hitcount}
                  </li>
                </ul>
              </div>
            </div>
            {/* 본문 */}
            <div
              className={styles.text}
              dangerouslySetInnerHTML={{ __html: post.text }}
            />
            <ControlButton
              isLogin={loginedUser}
              isWriter={post?.writer === loginedUser?.userId}
            />
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
      <Comment postNo={post.postNo} boardType={boardType} />
    </div>
  );
}

export default PostListItem;
