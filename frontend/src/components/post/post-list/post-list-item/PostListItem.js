import { useParams } from 'react-router-dom';
import { useBoardFetch } from '../../../../hooks/useBoardFetch';

// 각 게시글 내용을 볼 수 있는 컴포넌트
function PostListItem() {
  const { boardType, postNo } = useParams();
  const { post, status } = useBoardFetch(boardType, postNo);

  // console.log('PostListItem post: ', post);

  if (status === 'loading' || status === 'waiting') {
    return <div>게시글 정보를 불러오고 있어요!</div>;
  }

  const postItem = post.length ? post[0] : null;

  if (!postItem) {
    return <div>게시글이 존재하지 않습니다.</div>;
  }

  return (
    <div>
      {postItem.title}
      {postItem.text}
      {postItem.nickname}
    </div>
  );
}

export default PostListItem;
