import ReactConfetti from 'react-confetti';
import styles from './ParticleEffect.module.scss';

const Raindrop = ({ style }) => {
  return (
    <p className={styles.raindrop} style={style}>
      {'\u2502'}
    </p>
  );
};

const makeRaindrop = () => {
  let animationDelay = '0s';
  let fontSize = '14px';
  const arr = Array.from('123456789123456789123456789');

  return arr.map((el, i) => {
    animationDelay = `${(Math.random() * 5).toFixed(2)}s`;
    fontSize = `${Math.floor(Math.random() * 20) + 10}px`;
    const style = {
      animationDelay,
      fontSize,
    };
    return <Raindrop key={i} style={style} />;
  });
};

function ParticleEffect({ type = 'confetti' }) {
  return (
    <div className={styles.wrap}>
      {type === 'confetti' ? (
        <ReactConfetti
          className={styles.confetti}
          numberOfPieces={50}
          colors={['#b2cf5d', '#eadd54', '#3dcacd', '#fdb453', '#c18dcd']}
        />
      ) : (
        <div className={styles.rain}>{makeRaindrop()}</div>
      )}
    </div>
  );
}

export default ParticleEffect;
