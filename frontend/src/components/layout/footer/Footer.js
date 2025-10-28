import { footer } from '../../../lib/menus';
import Logo from '../../logo/Logo';
import Container from '../container/Container';
import { Nav } from '../nav/Nav';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <Logo isShow={false} className={styles.logo} />
        <div className={styles.contents}>
          <Nav menus={footer} />
          <div>
            <ul>
              <li>대표: 김ㅇㅇ</li>
              <li>
                주소: Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </li>
              <li>문의: 1234-1234</li>
            </ul>
          </div>
          <div>copyright</div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
