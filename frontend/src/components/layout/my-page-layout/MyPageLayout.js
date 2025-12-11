import { motion } from 'framer-motion';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Container from '../container/Container';
import styles from './MyPageLayout.module.scss';

function MyPageLayout({ compData }) {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  return (
    <div className={styles.wrap}>
      <Container className={styles.container}>
        <ul className={styles.sideNav}>
          {compData.map((menu, idx) => {
            const isActive = pathname === menu.path;
            return (
              <li key={idx}>
                <motion.button
                  onClick={() => navigate(menu.path)}
                  animate={{
                    width: isActive ? '180px' : '150px',
                    backgroundColor: isActive ? '#b2cf5d' : '#d9e7ae',
                    color: isActive ? '#fff' : '#333',
                  }}
                  whileHover={{
                    backgroundColor: '#9fc334',
                    color: '#fff',
                  }}
                  transition={{ duration: 0.25 }}
                  className={styles.navBtn}
                >
                  {menu.label}
                </motion.button>
              </li>
            );
          })}
        </ul>

        <motion.div
          key={pathname}
          className={styles.contents}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Outlet />
        </motion.div>
      </Container>
    </div>
  );
}

export default MyPageLayout;
