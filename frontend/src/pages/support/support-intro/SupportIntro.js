import { useNavigate } from 'react-router-dom';
import Container from '../../../components/layout/container/Container';
import styles from './SupportIntro.module.scss';

import cn from 'classnames';
import Button from './../../../components/button/Button';
import SupportList from './support-list/SupportList';

function SupportIntro() {
  const navigate = useNavigate();

  return (
    <div className={styles.support}>
      <Container className={styles.container}>
        <div className={cn(styles.board, styles.notice)}>
          <div className={styles.title}>
            <h3>새로운 소식</h3>
            <Button
              className={styles.more}
              variant="outline"
              isRound={true}
              onClick={() => navigate('/support/notice')}
            >
              더보기
            </Button>
          </div>
          <SupportList boardType="notice" />
        </div>
        <div className={cn(styles.board, styles.event)}>
          <div className={styles.title}>
            <h3>함께하는 이벤트</h3>
            <Button
              className={styles.more}
              variant="outline"
              isRound={true}
              onClick={() => navigate('/support/event')}
            >
              더보기
            </Button>
          </div>
          <SupportList boardType="event" />
        </div>
      </Container>
    </div>
  );
}

export default SupportIntro;
