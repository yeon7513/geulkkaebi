import { Outlet } from 'react-router-dom';
import Container from '../../components/layout/container/Container';

import styles from './Quiz.module.scss';

function Quiz() {
  return (
    <div className={styles.wrap}>
      <Container className={styles.container}>
        <Outlet />
      </Container>
    </div>
  );
}

export default Quiz;
