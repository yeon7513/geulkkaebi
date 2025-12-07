import axios from 'axios';
import cn from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import placeholder from '../../assets/img/no_images.png';
import { boardColors } from '../../lib/textIconLabel';
import {
  addComment,
  clearCommentList,
  getCommentByPost,
  updateCommentLike,
} from '../../store/board/commentSlice';
import { STATUS } from '../../store/common/commoms';
import { toggleLike } from '../../utils/toggleLike';
import Button from '../button/Button';
import ControlButton from '../control-button/ControlButton';
import LikeButton from '../like-button/LikeButton';
import ProfileCard from '../profile-card/ProfileCard';
import Card from './../card/Card';
import styles from './Comment.module.scss';

function Comment({ postNo, boardType }) {
  const { commentList, status } = useSelector((state) => state.commentSlice);
  const { loginedUser } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  console.log(commentList);

  const handleClickLike = async (cmtNo, isLiked) => {
    if (!loginedUser) {
      alert('로그인이 필요합니다.');
      return;
    }

    const { liked, countLikes } = await toggleLike('comment', cmtNo, isLiked);

    dispatch(updateCommentLike({ cmtNo, liked, countLikes }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentData = {
      postNo,
      writer: loginedUser.userId,
      text: e.target.text.value,
    };

    try {
      const res = await axios.post(`/comments/add/${postNo}`, commentData);

      // 새로 생성된 댓글 데이터 추가
      // 전체 갱신 대신 추가만 하도록 변경
      dispatch(addComment(res.data));

      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // 첫 마운트 시 이전 리덕스에 남아있는 댓글 리스트를 비움.
    // dispatch(clearCommentList());
    dispatch(getCommentByPost({ postNo }));
  }, [dispatch, postNo]);

  // 이전에 조회한 게시글의 댓글이 남아있는 현상 발견.
  // 언마운트 시 리덕스 초기화함.
  useEffect(() => {
    return () => {
      dispatch(clearCommentList());
    };
  }, [dispatch]);

  // 초기 렌더링용
  const isFirstLoading =
    (status === STATUS.LOADING || status === STATUS.WAITING) &&
    commentList.length === 0;

  if (isFirstLoading) {
    return (
      <div className={styles.loading}>
        <form className={styles.commentForm}>
          <textarea
            className={styles.writeComment}
            name="text"
            id="writeComment"
            placeholder={
              !loginedUser
                ? '로그인한 회원만 작성할 수 있습니다.'
                : '댓글을 작성해주세요.'
            }
            rows={3}
            disabled={!loginedUser}
          />
          <Button
            className={styles.submitBtn}
            type="submit"
            variant="outline"
            colors={boardColors[boardType]}
            disabled={!loginedUser}
          >
            등록
          </Button>
        </form>
        <p>
          <BeatLoader color="#ccc" />
        </p>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <form className={styles.commentForm} onSubmit={handleSubmit}>
        <textarea
          className={styles.writeComment}
          name="text"
          id="writeComment"
          placeholder={
            !loginedUser
              ? '로그인한 회원만 작성할 수 있습니다.'
              : '댓글을 작성해주세요.'
          }
          rows={3}
          disabled={!loginedUser}
        />
        <Button
          className={styles.submitBtn}
          type="submit"
          variant="outline"
          colors={boardColors[boardType]}
          disabled={!loginedUser}
        >
          등록
        </Button>
      </form>
      <div className={styles.comments}>
        {commentList.length <= 0 ? (
          <div className={styles.noComment}>아직 작성된 댓글이 없습니다.</div>
        ) : (
          commentList.map((data) => (
            <Card
              key={data.cmtNo}
              isPointer={false}
              className={styles.commentItem}
            >
              {data.writer === loginedUser.userId && (
                <div
                  className={cn(styles.mine, styles[boardColors[boardType]])}
                >
                  내 댓글
                </div>
              )}
              <div className={styles.header}>
                <ProfileCard
                  image={data?.profileImg || placeholder}
                  userId={data.writer}
                  nickname={data.nickname}
                  grade={data.grade}
                />
                <ul>
                  <li>
                    <span>작성</span>
                    {data.createdAt}
                  </li>
                  {data.modifiedAt !== null && (
                    <l1>
                      <span>수정</span>
                      {data.modifiedAt}
                    </l1>
                  )}
                </ul>
              </div>
              <div className={styles.contents}>
                <p>{data.text}</p>
                <LikeButton
                  name="commentLike"
                  count={data.countLikes}
                  isLiked={data.liked}
                  onChange={() => handleClickLike(data.cmtNo, data.liked)}
                />
              </div>
              <ControlButton
                isLogin={loginedUser}
                isWriter={data.writer === loginedUser.userId}
              />
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default Comment;
