import Post from '../../../components/post/Post';
import { formatLineBreaks } from '../../../utils/formatLineBreaks';
import { randomText } from '../../../utils/randomText';

function AllPost() {
  const allIntroText = [
    '여러 카테고리의 글을 한눈에 볼 수 있어요!\n토론마당, 스토리+, 도서 기자단 등 다양한 글을 확인해보세요.',
    '오늘 올라온 최신 글과 인기 글을 함께 볼 수 있습니다.\n흥미로운 이야기와 토론을 놓치지 마세요!',
    '전체 게시글을 보면서 관심 있는 주제를 찾아보세요.\n새로운 아이디어와 의견을 나눌 수 있어요.',
    '모든 게시글을 한 곳에서 확인하고,\n궁금한 글에 바로 참여해보세요!',
  ];

  return (
    <>
      <Post title={formatLineBreaks(randomText(allIntroText))} />
    </>
  );
}

export default AllPost;
