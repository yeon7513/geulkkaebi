import Article from '../pages/board/article/Article';
import Debate from '../pages/board/debate/Debate';
import PopularPosts from '../pages/board/popularPosts/PopularPosts';
import Story from '../pages/board/story/Story';
import { useComponentContext } from './ComponentProvider';

function BoardCategory() {
  const { currComp } = useComponentContext();

  switch (currComp) {
    case 'PopularPosts':
      return <PopularPosts />;
    case 'Debate':
      return <Debate />;
    case 'Story':
      return <Story />;
    case 'Article':
      return <Article />;
    default:
      return <PopularPosts />;
  }
}

export default BoardCategory;
