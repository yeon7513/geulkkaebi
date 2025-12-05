import cn from 'classnames';
import { useEffect } from 'react';
import Card from '../../../components/card/Card';
import styles from './PopularPosts.module.scss';

import { FaCalendarAlt, FaEye, FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import TextIcon from '../../../components/text-icon/TextIcon';
import { fetchPopularPosts } from '../../../store/board/postSlice';

import { useNavigate } from 'react-router-dom';
import placeholder from '../../../assets/img/no_images.png';
import ProfileCard from '../../../components/profile-card/ProfileCard';
import { boardColors, boardNames } from '../../../lib/textIconLabel';
import { formatCreatedAt } from '../../../utils/formatter';

function PopularPosts() {
  const { popularPosts } = useSelector((state) => state.postSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // redux에서 인기글 불러오기
  useEffect(() => {
    dispatch(fetchPopularPosts());
  }, [dispatch]);

  if (!popularPosts) {
    return <div>게시글을 불러오는 중이에요!</div>;
  }

  return (
    <div className={styles.popular}>
      <h3>오늘 친구들이 많이 본 이야기</h3>
      <div className={styles.post}>
        {popularPosts.map((item) => (
          <Card
            key={item.postNo}
            className={cn(styles.item, styles[item.boardType])}
            onClick={() => navigate(`/board/${item.boardType}/${item.postNo}`)}
          >
            <div className={styles.contents}>
              {/* 글 제목 */}
              <div className={styles.title}>
                <TextIcon colors={boardColors[item.boardType]}>
                  {boardNames[item.boardType]}
                </TextIcon>
                <h4>{item.title}</h4>
              </div>
              <div className={styles.info}>
                {/* 등록 정보 */}
                <ProfileCard
                  image={item.profileImg || placeholder}
                  userId={item.writer}
                  nickname={item.nickname}
                  grade={item.grade}
                />
                <div className={styles.reg}>
                  <div className={styles.date}>
                    <FaCalendarAlt />
                    <span>{formatCreatedAt(item.createdAt)}</span>
                  </div>
                  <div className={styles.count}>
                    <span className={styles.hit}>
                      <FaEye />
                      <span>{item.hitcount}</span>
                    </span>
                    <span className={styles.likes}>
                      <FaHeart />
                      <span>{item.countLikes}</span>
                    </span>
                  </div>
                </div>
              </div>
              {/* 본문 */}
              <div className={styles.textWrap}>
                <p
                  className={styles.text}
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
                {item.text.length >= 500 && <span>더보기</span>}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default PopularPosts;
