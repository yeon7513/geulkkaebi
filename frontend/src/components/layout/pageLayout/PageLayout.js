import { Outlet } from 'react-router-dom';
import Container from '../container/Container';
import { Nav } from '../nav/Nav';
import styles from './PageLayout.module.scss';

function PageLayout({ submenu }) {
  return (
    <section className={styles.wrap}>
      <div className={styles.pageTitle}>
        <Nav menus={submenu} />
      </div>
      <Container>
        <Outlet />
      </Container>
    </section>
  );
}

export default PageLayout;
