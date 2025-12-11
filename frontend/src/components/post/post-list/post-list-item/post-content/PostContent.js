import styles from './PostContent.module.scss';

function PostContent({ text }) {
  return (
    <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
  );
}

export default PostContent;
