import { Link, Outlet } from 'react-router-dom';

function Board(props) {
  return (
    <div>
      <h1>board</h1>
      <Link to="/board/notice">공지</Link>
      <Link to="/board/debate">토론</Link>
      <Link to="/board/story">이야기</Link>
      <Link to="/board/article">기사</Link>
      <Outlet />
    </div>
  );
}

export default Board;
