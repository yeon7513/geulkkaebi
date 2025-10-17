import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';
import Footer from './footer/Footer';
import Header from './header/Header';

function Layout() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.container}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
