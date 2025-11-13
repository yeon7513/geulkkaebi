import PopularPosts from '../pages/board/popularPosts/PopularPosts';
import Proverb from '../pages/quiz/proverb/Proverb';
import QuizIntro from '../pages/quiz/quiz-intro/QuizIntro';
import QuizResult from '../pages/quiz/quiz-result/QuizResult';
import Word from '../pages/quiz/word/Word';
import { useComponentContext } from './ComponentProvider';

function QuizCategory(props) {
  const { currComp } = useComponentContext();

  switch (currComp) {
    case 'QuizIntro':
      return <QuizIntro />;
    case 'Word':
      return <Word />;
    case 'Proverb':
      return <Proverb />;
    case 'QuizResult':
      return <QuizResult />;
    default:
      return <PopularPosts />;
  }
}

export default QuizCategory;
