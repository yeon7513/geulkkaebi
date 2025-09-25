import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

// 화면에 렌더링할 때 랜덤으로 퀴즈가 등장
// 데이터를 하나만 조회할 필요가 없음.
// => 리액트에서 모든 데이터를 받고, 결과를 보낸 후
// 다시 렌더링할 때 랜덤으로 데이터 하나만 뽑아올 예정

// 구현 순서 (예정)
// 모든 퀴즈 데이터를 가지고 있는 상태에서
// 화면을 렌더링 할 때 모든 데이터 중 랜덤으로 하나를 골라 가져옴
// 사용자가 문제 풀이 후, 결과를 보낸다.

// -> 여기서 든 생각
// 랜덤으로 5~10개 가져온 후에 5~10문제를 푼 후에
// 점수 결과가 나오면 괜찮을 듯 함.

// 결과 화면 보고, 다시 도전 << 이런 버튼 만들고
// 누르면 재렌더링 -> 문제를 랜덤으로 가져옴.

// 부모 컴포넌트에서 자식 컴포넌트로 받아온 데이터를 걸러서
// 넣어주는게 나을 듯 하다. (SELECT가 다르니까)
// 특히 관리자가 제어하는 등록, 수정, 삭제의 구현이 다름..

function Quiz() {
  // const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    // axios.get('');
  }, []);

  return (
    <div>
      <h1>quiz</h1>
      <Link to="/quiz/word">단어 퀴즈</Link>
      <Link to="/quiz/proverb">속담 퀴즈</Link>
      <Outlet />
    </div>
  );
}

export default Quiz;
