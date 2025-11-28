import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Button from '../../../components/button/Button';
import Card from '../../../components/card/Card';
import styles from './PopularPosts-origin.module.scss';

import { FaCalendarAlt, FaEye, FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import TextIcon from '../../../components/text-icon/TextIcon';
import { fetchPopularPosts } from '../../../store/board/postSlice';
import { formatCreatedAt } from '../../../utils/formatCreatedAt';

function PopularPosts() {
  const { post } = useSelector((state) => state.postSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 미리보기용 글 번호 선택 state
  const [selectedNo, setSelectedNo] = useState(post[0]?.postNo || null);

  // redux에서 인기글 불러오기
  useEffect(() => {
    dispatch(fetchPopularPosts());
  }, [dispatch]);

  // post가 업데이트될 때 첫 글 자동 선택
  useEffect(() => {
    if (post.length > 0) {
      setSelectedNo((prev) => prev ?? post[0].postNo);
    }
  }, [post]);

  // 미리보기용 게시글 찾기
  const selectedPost = post.find((p) => p.postNo === selectedNo);

  // 제목 렌더링용으로 useLocation 호출
  const { pathname } = useLocation();

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

  if ((!selectedPost && post.length === 0) || !post) {
    return <div>게시글을 불러오는 중이에요!</div>;
  }

  if (!selectedPost && post.length > 0) {
    setSelectedNo(post[0].postNo);
    return null; // 다음 렌더에서 selectedPost가 잡히도록 함
  }

  return (
    <div className={styles.board}>
      {pathname === '/' ? (
        <h3>오늘 친구들이 많이 본 이야기</h3>
      ) : (
        <h3 className={styles.pageTitle}>지금 가장 관심받는 이야기에요.</h3>
      )}
      <div className={styles.post}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPost.postNo}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className={styles.detail}
          >
            <Card
              className={cn(styles.detailItem, styles[selectedPost.boardType])}
              isPointer={false}
            >
              <div className={styles.contents}>
                {/* 글 제목 */}
                <div className={styles.title}>
                  <TextIcon colors={boardColors[selectedPost.boardType]}>
                    {boardNames[selectedPost.boardType]}
                  </TextIcon>
                  <h4>{selectedPost.title}</h4>
                </div>
                <div className={styles.info}>
                  {/* 등록 정보 */}
                  <div className={styles.reg}>
                    <span className={styles.writer}>
                      {selectedPost.nickname}
                    </span>
                    <div className={styles.count}>
                      <span className={styles.date}>
                        <FaCalendarAlt />
                        {formatCreatedAt(selectedPost.createdAt)}
                      </span>
                      <span className={styles.hit}>
                        <FaEye />
                        {selectedPost.hitcount}
                      </span>
                      <span className={styles.likes}>
                        <FaHeart />
                        {selectedPost.countLikes}
                      </span>
                    </div>
                  </div>
                </div>
                {/* 본문 */}
                <p className={styles.text}>{selectedPost.text} ...</p>
                {/* 더보기 버튼 */}
                <div className={styles.moreBtn}>
                  <Button
                    isRound={true}
                    variant="pushable"
                    colors={boardColors[selectedPost.boardType]}
                    onClick={() =>
                      navigate(
                        `/board/${selectedPost.boardType}/${selectedPost.postNo}`
                      )
                    }
                  >
                    함께 이야기 하기
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className={styles.ranks}>
          {post.map((item, index) => {
            let crown = '';
            if (index === 0) crown = '👑';
            else if (index === 1) crown = '🥈';
            else if (index === 2) crown = '🥉';
            return (
              <motion.div
                key={item.postNo}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={styles.listItem}
                onClick={() => setSelectedNo(item.postNo)}
              >
                <Card
                  className={cn(styles.listData, {
                    [styles.selected]: item.postNo === selectedNo,
                  })}
                >
                  <h4 className={styles.listTitle}>
                    <span className={styles.rankIcon}>{crown} </span>
                    {item.title}
                  </h4>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PopularPosts;
