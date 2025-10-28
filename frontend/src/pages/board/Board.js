import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import { boardTest } from '../../lib/boardTest';
import styles from './Board.module.scss';

import { FaCalendarAlt, FaEye, FaHeart } from 'react-icons/fa';
import TextIcon from '../../components/text-icon/TextIcon';

function Board() {
  // 순위 계산
  const rankedPosts = useMemo(() => {
    return [...boardTest].sort(
      (a, b) => b.hitcount + b.likes - (a.hitcount + a.likes)
    );
  }, [boardTest]);

  const [selectedId, setSelectedId] = useState(rankedPosts[0].postId);

  // 게시글 상세 선택
  const selectedPost = rankedPosts.find((post) => post.postId === selectedId);

  const boardStyles = {
    debate: styles.debate,
    article: styles.article,
    story: styles.story,
  };

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

  return (
    <div className={styles.board}>
      <h3>오늘의 인기글</h3>
      <div className={styles.post}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPost.postId}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className={styles.detail}
          >
            <Card
              className={cn(
                styles.detailItem,
                boardStyles[selectedPost.boardType]
              )}
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
                    <span className={styles.writer}>{selectedPost.writer}</span>
                    <div className={styles.count}>
                      <span className={styles.date}>
                        <FaCalendarAlt />
                        {selectedPost.createdAt}
                      </span>
                      <span className={styles.hit}>
                        <FaEye />
                        {selectedPost.hitcount}
                      </span>
                      <span className={styles.likes}>
                        <FaHeart />
                        {selectedPost.likes}
                      </span>
                    </div>
                  </div>
                </div>
                {/* 본문 */}
                <p className={styles.text}>{selectedPost.text}</p>
                {/* 더보기 버튼 */}
                <div className={styles.moreBtn}>
                  <Button
                    isRound={true}
                    variant="pushable"
                    colors={boardColors[selectedPost.boardType]}
                  >
                    함께 이야기 하기
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className={styles.ranks}>
          {rankedPosts.map((post, index) => {
            let crown = '';
            if (index === 0) crown = '👑';
            else if (index === 1) crown = '🥈';
            else if (index === 2) crown = '🥉';
            return (
              <motion.div
                key={post.postId}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={styles.listItem}
                onClick={() => setSelectedId(post.postId)}
              >
                <Card
                  className={cn(styles.listData, {
                    [styles.selected]: post.postId === selectedId,
                  })}
                >
                  <h4 className={styles.listTitle}>
                    <span className={styles.rankIcon}>{crown} </span>
                    {post.title}
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

export default Board;
