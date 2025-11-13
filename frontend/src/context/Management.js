import BoardManagement from '../pages/manager/board-management/BoardManagement';
import MemberManagement from '../pages/manager/member-management/MemberManagement';
import QuizManagement from '../pages/manager/quiz-management/QuizManagement';
import Statistics from '../pages/manager/statistics/Statistics';
import { useComponentContext } from './ComponentProvider';

function Management() {
  const { currComp } = useComponentContext();

  switch (currComp) {
    case 'Statistics':
      return <Statistics />;
    case 'MemberManagement':
      return <MemberManagement />;
    case 'BoardManagement':
      return <BoardManagement />;
    case 'QuizManagement':
      return <QuizManagement />;
    default:
      return <Statistics />;
  }
}

export default Management;
