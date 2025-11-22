import Post from '../../../components/post/Post';
import { formatLineBreaks } from '../../../utils/formatLineBreaks';
import { randomText } from '../../../utils/randomText';

function Debate() {
  const debateIntroText = [
    '백설공주의 여왕, 왜 외모에 그렇게 집착했을까?\n오늘날 외모 이야기까지 같이 이야기해봐요!',
    '피노키오가 거짓말을 했대요.\n그럼 우리도 솔직함에 대해 이야기해볼까요?',
    '흥부와 놀부, 형제 간의 갈등을 어떻게 해결하면 좋을지\n같이 토론해봐요.',
    '신데렐라가 유리구두를 잃어버렸대요.\n다른 방법으로도 행복할 수 있을까 이야기해봐요.',
    '도서 속 캐릭터가 잘못된 선택을 했어요.\n여러분이라면 어떻게 했을까요?',
  ];

  return (
    <>
      <Post
        title={formatLineBreaks(randomText(debateIntroText))}
        boardType="debate"
        themeColor="green"
      />
    </>
  );
}

export default Debate;
