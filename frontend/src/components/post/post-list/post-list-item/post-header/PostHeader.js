import placeholder from '../../../../../assets/img/no_images.png';
import { boardColors, boardNames } from '../../../../../lib/textIconLabel';
import ProfileCard from '../../../../profile-card/ProfileCard';
import TextIcon from '../../../../text-icon/TextIcon';
import styles from './PostHeader.module.scss';

function PostHeader({ post }) {
  return (
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
          {post.modifiedAt && (
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
  );
}

export default PostHeader;
