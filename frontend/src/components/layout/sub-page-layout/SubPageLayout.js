import { Outlet, useNavigate } from 'react-router-dom';
import Button from '../../button/Button';
import Container from '../container/Container';
import styles from './SubPageLayout.module.scss';

function SubPageLayout({ compData }) {
  const navigate = useNavigate();

  return (
    <section className={styles.wrap}>
      <div className={styles.pageTitle}>
        {compData.map((menu, idx) => (
          <Button
            key={idx}
            variant="pushable"
            colors={menu.color || 'green'}
            onClick={() => navigate(menu.path)}
          >
            {menu.label}
          </Button>
        ))}
      </div>
      <Container>
        <Outlet />
      </Container>
    </section>
  );
}

export default SubPageLayout;
