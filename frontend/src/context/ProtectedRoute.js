import { Navigate, Outlet } from 'react-router-dom';
import { STATUS } from '../store/common/commoms';
import { useAuth } from './AuthContext';

// 비회원 또는 일반 사용자 접근 금지
function ProtectedRoute({ adminOnly }) {
  const { isLogin, isAdmin, status } = useAuth();

  // 로그인 여부 검사 대기 — 화면 표시 X
  if (status === STATUS.WAITING || status === STATUS.LOADING) {
    return null;
  }

  // 로그인 실패 또는 비로그인
  if (status === STATUS.SUCCESS && !isLogin) {
    alert('로그인이 필요합니다.');
    return <Navigate to="/sign/login" replace />;
  }

  // 관리자 접근 제한
  if (adminOnly && isLogin && !isAdmin) {
    alert('관리자만 접근 가능합니다.');
    return <Navigate to="/" replace />;
  }

  // 모든 조건 통과 후에만 화면 렌더링
  return <Outlet />;
}

export default ProtectedRoute;
