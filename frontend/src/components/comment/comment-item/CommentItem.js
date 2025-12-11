import cn from 'classnames';
import placeholder from '../../../assets/img/no_images.png';
import Card from '../../card/Card';
import ProfileCard from '../../profile-card/ProfileCard';
import styles from './CommentItem.module.scss';

import { useState } from 'react';
import Button from '../../button/Button';
import ControlButton from '../../control-button/ControlButton';
import LikeButton from '../../like-button/LikeButton';

function CommentItem({
  comment,
  themeColor,
  loginedUser,
  onDelete,
  onEditSubmit,
  onLike,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [newText, setNewText] = useState(comment?.text);

  const handleToggleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const handleChangeText = (e) => {
    setNewText(e.target.value);
  };

  return (
    <Card className={styles.container} isPointer={false}>
      {/* 댓글 정보 */}
      <div className={styles.header}>
        <ProfileCard
          image={comment?.profileImg || placeholder}
          userId={comment.writer}
          nickname={comment.nickname}
          grade={comment.grade}
          isMine={loginedUser ? comment.writer === loginedUser.userId : false}
          themeColorClass={cn(styles.mine, styles[themeColor])}
        />
        <ul className={styles.info}>
          <li>
            <span>작성</span>
            {comment.createdAt}
          </li>
          {comment.modifiedAt && (
            <li>
              <span>수정</span>
              {comment.modifiedAt}
            </li>
          )}
          <li>
            <LikeButton
              className={styles.liked}
              name="commentLike"
              count={comment.countLikes}
              isLiked={comment.liked}
              onChange={() => onLike(comment.cmtNo, comment.liked)}
            />
          </li>
        </ul>
      </div>
      {/* 댓글 컨텐츠 */}
      <div className={styles.contents}>
        {isEdit ? (
          <form
            className={styles.edit}
            onSubmit={(e) => {
              onEditSubmit(e, comment.cmtNo);
              setIsEdit(false);
            }}
          >
            <textarea
              name="text"
              className={cn(styles.textInput, styles[themeColor])}
              placeholder="댓글을 작성해주세요."
              defaultValue={newText}
              rows={5}
              onChange={(e) => handleChangeText(e)}
            />
            <div className={styles.btns}>
              <Button type="submit" variant="outline" colors={themeColor}>
                수정
              </Button>
              <Button
                type="button"
                variant="outline"
                colors="gray"
                onClick={handleToggleEdit}
              >
                취소
              </Button>
            </div>
          </form>
        ) : (
          <p>{comment.text}</p>
        )}
      </div>
      <ControlButton
        isEdit={isEdit}
        isLogin={loginedUser}
        isWriter={loginedUser ? comment.writer === loginedUser.userId : false}
        onEdit={handleToggleEdit}
        onDelete={() => onDelete(comment.cmtNo)}
      />
    </Card>
  );
}

export default CommentItem;
