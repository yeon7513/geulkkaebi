import { Link } from 'react-router-dom';
import { gnb } from './../../../lib/menus';
import Nav from './../../nav/Nav';
import Container from './../container/Container';
import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <h1 className={styles.logo}>
          <Link to="/">logo</Link>
        </h1>
        <Nav menus={gnb} />
      </Container>
    </header>
  );
}

export default Header;
