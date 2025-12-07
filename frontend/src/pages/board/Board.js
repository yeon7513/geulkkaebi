import { Navigate, useLocation } from 'react-router-dom';
import SubPageLayout from '../../components/layout/sub-page-layout/SubPageLayout';
import { board } from '../../lib/menus';

function Board() {
  const { pathname } = useLocation();

  // /board 로 정확히 들어온 경우에만 1회 리다이렉트
  if (pathname === '/board') return <Navigate to="/board/all" replace />;

  return (
    <>
      <SubPageLayout compData={board} />
    </>
  );
}

export default Board;
