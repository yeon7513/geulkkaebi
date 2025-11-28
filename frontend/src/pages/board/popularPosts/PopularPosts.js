import cn from 'classnames';
import { useEffect } from 'react';
import Button from '../../../components/button/Button';
import Card from '../../../components/card/Card';
import styles from './PopularPosts.module.scss';

import { FaCalendarAlt, FaEye, FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import TextIcon from '../../../components/text-icon/TextIcon';
import { fetchPopularPosts } from '../../../store/board/postSlice';
import { formatCreatedAt } from '../../../utils/formatCreatedAt';

import { useNavigate } from 'react-router-dom';
import placeholder from '../../../assets/img/no_images.png';
import { formatGrade } from '../../../utils/formatGrade';

function PopularPosts() {
  const { post } = useSelector((state) => state.postSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // redux에서 인기글 불러오기
  useEffect(() => {
    dispatch(fetchPopularPosts());
  }, [dispatch]);

  const boardNames = {
    debate: '토론마당',
    article: '도서 기자단',
    story: '스토리+',
  };

  const boardColors = {
    debate: 'green',
    article: 'orange',
    story: 'purple',
  };

  if (!post) {
    return <div>게시글을 불러오는 중이에요!</div>;
  }

  return (
    <div className={styles.popular}>
      <h3>오늘 친구들이 많이 본 이야기</h3>
      <div className={styles.post}>
        {post.map((item) => (
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
                <div className={styles.writer}>
                  <img src={item.profileImg || placeholder} alt="" />
                  <div className={styles.user}>
                    <span>{formatGrade(item.grade)}</span>
                    <span>{item.nickname}</span>
                  </div>
                </div>
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
              <p className={styles.text}>{item.text}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* 더보기 버튼 */}
      <div className={styles.moreBtn}>
        <Button isRound={true} variant="pushable" colors="yellow">
          함께 이야기 하기
        </Button>
      </div>
    </div>
  );
}

export default PopularPosts;
