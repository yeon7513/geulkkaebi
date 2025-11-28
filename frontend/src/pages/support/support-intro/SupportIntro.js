import { Link } from 'react-router-dom';
import Container from '../../../components/layout/container/Container';
import { supportTest } from '../../../lib/supportTest';
import styles from './SupportIntro.module.scss';

import cn from 'classnames';
import Button from './../../../components/button/Button';

function SupportIntro() {
  return (
    <div className={styles.support}>
      <Container className={styles.container}>
        <div className={cn(styles.board, styles.notice)}>
          <div className={styles.title}>
            <h3>새로운 소식</h3>
            <Button className={styles.more} variant="outline" isRound={true}>
              더보기
            </Button>
          </div>
          <ul>
            {supportTest.map((post) => (
              <li key={post.id}>
                <Link to={`/support/${post.boardType}/${post.id}`}>
                  <div className={styles.contents}>
                    <p>{post.title}</p>
                    <span className={styles.date}>{post.createdAt}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={cn(styles.board, styles.event)}>
          <div className={styles.title}>
            <h3>함께하는 이벤트</h3>
            <Button className={styles.more} variant="outline" isRound={true}>
              더보기
            </Button>
          </div>
          <ul>
            {supportTest.map((post) => (
              <li key={post.id}>
                <Link to={`/support/${post.boardType}/${post.id}`}>
                  <div className={styles.contents}>
                    <p>{post.title}</p>
                    <span className={styles.date}>{post.createdAt}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}

export default SupportIntro;
