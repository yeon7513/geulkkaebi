import Post from '../../../components/post/Post';
import { formatLineBreaks } from '../../../utils/formatLineBreaks';
import { randomText } from '../../../utils/randomText';

function Story() {
  const storyIntroText = [
    '콩쥐와 팥쥐 이야기 들어봤나요?\n외국에는 비슷한 ‘신데렐라’ 이야기도 있대요. 우리만의 뉴스로 전해봐요!',
    '백설공주 왕비, 왜 항상 거울을 봤는지\n분석해보는 기사를 작성해볼까요?',
    '피노키오의 코가 길어진 사건,\n오늘의 뉴스로 재미있게 정리해봐요.',
    '흥부의 나눔 이야기,\n여러분만의 인터뷰 기사 형식으로 작성해보세요.',
    '신데렐라 무도회 사건,\n오늘의 특종 뉴스처럼 요약해보는 건 어떨까요?',
  ];

  return (
    <>
      <Post
        title={formatLineBreaks(randomText(storyIntroText))}
        boardType="story"
      />
    </>
  );
}

export default Story;
