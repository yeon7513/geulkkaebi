import { useEffect, useState } from 'react';
import logoImg from '../../assets/img/logo_v3.png';
import styles from './Logo.module.scss';

const decorateLogo = [
  '나의 비밀 친구 ',
  '읽고 쓰는 게 즐거워지는 ',
  '놀면서 배우는 ',
  '재미로 배우는 ',
  '상상력이 반짝이는 ',
  '웃음이 피어나는 ',
];

function Logo({ isShow = true }) {
  const [decoLogo, setDecoLogo] = useState('');

  useEffect(() => {
    const randomText =
      decorateLogo[Math.floor(Math.random() * decorateLogo.length)];
    setDecoLogo(randomText);
  }, []);

  return (
    <>
      <span className={isShow ? styles.decoText : styles.hide}>{decoLogo}</span>
      <span className={styles.logoText}>글깨비</span>
      <img className={styles.logoImg} src={logoImg} alt="글깨비" />
    </>
  );
}

export default Logo;
