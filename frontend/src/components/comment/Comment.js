import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { boardColors } from '../../lib/textIconLabel';
import {
  addComment,
  clearCommentList,
  deleteComment,
  getCommentByPost,
  updateComment,
  updateCommentLike,
} from '../../store/board/commentSlice';
import { STATUS } from '../../store/common/commoms';
import { toggleLike } from '../../utils/toggleLike';
import Button from '../button/Button';
import styles from './Comment.module.scss';
import CommentItem from './comment-item/CommentItem';

function Comment({ postNo, boardType }) {
  const { commentList, status } = useSelector((state) => state.commentSlice);
  const { loginedUser } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  // 좋아요 토글 핸들러
  const handleClickLike = async (cmtNo, isLiked) => {
    if (!loginedUser) {
      alert('로그인이 필요합니다.');
      return;
    }

    const { liked, countLikes } = await toggleLike('comment', cmtNo, isLiked);

    dispatch(updateCommentLike({ cmtNo, liked, countLikes }));
  };

  // 댓글 등록 핸들러
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

  // 댓글 수정 핸들러
  const handleUpdateComment = async (e, cmtNo) => {
    e.preventDefault();

    const targetComment = commentList.find((c) => c.cmtNo === cmtNo);

    const updateData = {
      ...targetComment,
      text: e.target.text.value,
    };

    try {
      await dispatch(updateComment({ cmtNo, updateData }));
    } catch (error) {
      console.log(error);
    }
  };

  // 댓글 삭제 핸들러
  const handleClickDelete = (cmtNo) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    dispatch(deleteComment(cmtNo))
      .unwrap()
      .then(() => {
        alert('삭제되었습니다.');
      })
      .catch(() => {
        alert('삭제 중 문제가 발생했습니다.');
      });
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
        <span className={styles.countComment}>댓글 {commentList.length}개</span>
        {commentList.length <= 0 ? (
          <div className={styles.noComment}>아직 작성된 댓글이 없습니다.</div>
        ) : (
          commentList.map((data) => (
            <CommentItem
              key={`${data.cmtNo}-${data.modifiedAt}`}
              comment={data}
              themeColor={boardColors[boardType]}
              loginedUser={loginedUser}
              onEditSubmit={handleUpdateComment}
              onDelete={(cmtNo) => handleClickDelete(cmtNo)}
              onLike={handleClickLike}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Comment;
