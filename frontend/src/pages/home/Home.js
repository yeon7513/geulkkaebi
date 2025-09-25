import Card from '../../components/card/Card';
import Container from './../../components/layout/container/Container';
import styles from './Home.module.scss';
import Visual from './visual/Visual';

function Home() {
  return (
    <div className={styles.home}>
      {/* 메인 슬라이드 */}
      <Visual />
      <Container className={styles.icons}>
        {/* 바로가기 */}
        <Card className={styles.iconContent}>icon1</Card>
        <Card className={styles.iconContent}>icon2</Card>
        <Card className={styles.iconContent}>icon3</Card>
        <Card className={styles.iconContent}>icon4</Card>
        <Card className={styles.iconContent}>icon5</Card>
      </Container>
      <div className={styles.cards}>
        <Card>card1</Card>
        <Card>card1</Card>
        <Card>card1</Card>
        <Card>card1</Card>
      </div>
    </div>
  );
}

export default Home;
