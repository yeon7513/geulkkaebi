import styles from './Layout.module.scss';
import Header from './header/Header';
import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';

function Layout(props) {
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
