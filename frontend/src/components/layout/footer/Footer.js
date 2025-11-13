import { footer } from '../../../lib/menus';
import Logo from '../../logo/Logo';
import Container from '../container/Container';
import { Nav } from '../nav/Nav';
import styles from './Footer.module.scss';

import { RiKakaoTalkFill } from 'react-icons/ri';
import { TbBrandInstagram, TbBrandYoutubeFilled } from 'react-icons/tb';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerNav}>
        <Nav menus={footer} />
      </div>
      <Container className={styles.container}>
        <Logo isShow={false} className={styles.logo} />
        <div className={styles.info}>
          <p>
            글깨비는 어린이들이 스스로 읽고 이해하는 힘을 기를 수 있도록 돕는
            문해력 학습 플랫폼입니다. <br />
            읽기와 생각의 즐거움을 통해 아이들이 스스로 배우고 성장할 수 있도록
            함께 하겠습니다.
          </p>
          <ul>
            <li>
              <span>(주)에듀앤드림</span>
            </li>
            <li>
              <span>대표.</span> 문희연
            </li>
            <li>
              <span>주소.</span> 대전광역시 동구 우암로 352-21
            </li>
          </ul>
          <ul>
            <li>
              <span>전화.</span> 042-670-0600
            </li>
            <li>
              <span>메일.</span> geulkkaebi@gkkb.com
            </li>
          </ul>
        </div>
        <div className={styles.sns}>
          <ul>
            <li className={styles.youtube}>
              <TbBrandYoutubeFilled />
            </li>
            <li className={styles.insta}>
              <TbBrandInstagram />
            </li>
            <li className={styles.kakao}>
              <RiKakaoTalkFill />
            </li>
          </ul>
        </div>
      </Container>
      <div className={styles.copy}>
        <small>Copyright 2025. GEULKKAEBI. All right reserved.</small>
      </div>
    </footer>
  );
}

export default Footer;
