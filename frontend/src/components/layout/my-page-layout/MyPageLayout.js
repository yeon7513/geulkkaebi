import { Outlet, useNavigate } from 'react-router-dom';
import Container from '../container/Container';
import styles from './MyPageLayout.module.scss';

function MyPageLayout({ compData }) {
  const navigate = useNavigate();

  return (
    <div className={styles.wrap}>
      <Container className={styles.container}>
        <ul className={styles.sideNav}>
          {compData.map((menu, idx) => (
            <li key={idx}>
              <button onClick={() => navigate(menu.path)}>{menu.label}</button>
            </li>
          ))}
        </ul>
        <div className={styles.container}>
          <Outlet />
        </div>
      </Container>
    </div>
  );
}

export default MyPageLayout;
