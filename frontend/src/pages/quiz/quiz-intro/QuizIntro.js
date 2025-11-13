import { useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button';
import { quiz } from '../../../lib/menus';

function QuizIntro() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>QuizIntro</h1>
      <h3>어떤 퀴즈 풀까요?</h3>
      <p>모든 퀴즈는 5문제씩 풀 수 있습니다.</p>
      <ul>
        {quiz.map((menu, idx) => (
          <li key={idx}>
            <Button
              variant="pushable"
              colors={menu.color}
              onClick={() => navigate(menu.path)}
            >
              {menu.label}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizIntro;
