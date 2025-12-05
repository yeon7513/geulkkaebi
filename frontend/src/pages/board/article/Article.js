import Post from '../../../components/post/Post';
import { formatLineBreaks } from '../../../utils/formatter';
import { randomText } from '../../../utils/randomText';

function Article() {
  const articleIntroText = [
    '흥부가 부자가 되고, 놀부가 반성해서 ‘흥부재단’을 만들었대요!\n두 형제가 함께 봉사하며 살아가는 이야기를 같이 만들어봐요.',
    '백설공주가 왕자를 만나고 난 뒤, 다른 모험을 떠났대요.\n여러분이라면 어떤 모험을 만들겠어요?',
    '피노키오가 진짜 소년이 된 뒤,\n첫 번째 시험을 통과하려면 어떻게 해야 할까요?',
    '신데렐라가 유리구두를 잃어버린 후,\n집안 문제를 해결한 방법을 상상해봐요.',
    '흥부가 복을 나누는 과정에서 생긴 작은 사건들,\n여러분만의 이야기를 이어가봐요.',
  ];

  return (
    <>
      <Post
        title={formatLineBreaks(randomText(articleIntroText))}
        boardType="article"
        themeColor="orange"
      />
    </>
  );
}

export default Article;
