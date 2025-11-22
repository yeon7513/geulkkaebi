import Post from '../../../components/post/Post';

function Notice(props) {
  return (
    <div>
      <Post title="공지사항 게시판" boardType="notice" themeColor="green" />
    </div>
  );
}

export default Notice;
