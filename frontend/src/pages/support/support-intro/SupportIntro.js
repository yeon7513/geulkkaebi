import Card from '../../../components/card/Card';
import Container from '../../../components/layout/container/Container';
import TextIcon from '../../../components/text-icon/TextIcon';
import { supportTest } from '../../../lib/supportTest';
import styles from './SupportIntro.module.scss';

function SupportIntro() {
  return (
    <div className={styles.support}>
      <h3>새로운 소식과 함께하는 이벤트</h3>
      <Container className={styles.container}>
        {supportTest.map((post) => (
          <Card key={post.id} className={styles.post}>
            {/* path 수정할 것!! */}
            <a href={`/support/${post.boardType}/${post.id}`}>
              <img src={post.image} alt="" />
              <div className={styles.contents}>
                <div className={styles.header}>
                  {post.boardType === 'notice' ? (
                    <TextIcon colors="green">공지사항</TextIcon>
                  ) : (
                    <TextIcon colors="yellow">이벤트</TextIcon>
                  )}
                  <span className={styles.date}>{post.createdAt}</span>
                </div>
                <div className={styles.detail}>
                  <h4>{post.title}</h4>
                  <p>{post.text}</p>
                </div>
              </div>
            </a>
          </Card>
        ))}
      </Container>
    </div>
  );
}

export default SupportIntro;
