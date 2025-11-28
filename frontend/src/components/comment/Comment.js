import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentByPost } from '../../store/board/commentSlice';
import styles from './Comment.module.scss';

import placeholder from '../../assets/img/no_images.png';

function Comment({ postNo }) {
  const { comment } = useSelector((state) => state.commentSlice);
  const dispatch = useDispatch();

  console.log(comment);

  useEffect(() => {
    dispatch(getCommentByPost({ postNo }));
  }, [dispatch, postNo]);

  return (
    <div className={styles.comments}>
      {comment.map((data) => (
        <div key={data.cmtNo}>
          <div className={styles.writer}>
            <img src={data.profileImg || placeholder} width={50} alt="" />
            <div>{data.nickname}</div>
          </div>
          <p>{data.text}</p>
          <span>{data.createdAt}</span>
        </div>
      ))}
    </div>
  );
}

export default Comment;
