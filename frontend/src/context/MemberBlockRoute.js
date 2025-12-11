import { Navigate, Outlet } from 'react-router-dom';
import { STATUS } from '../store/common/commoms';
import { useAuth } from './AuthContext';

// 회원은 접근 금지 - 로그인, 회원가입
function MemberBlockRoute() {
  const { isLogin, status } = useAuth();

  // 문제는 제대로 작동 안하고 있음. 환장하겠다.
  // 계속 안되면 빼버릴 것!

  // 로그인 여부 검사 대기 — 화면 표시 X
  if (status === STATUS.WAITING || status === STATUS.LOADING) {
    return null;
  }

  // 회원이면 접근 막기
  if (isLogin) {
    alert('이미 로그인되어 있습니다.');
    return <Navigate to="/" replace />;
  }

  // 비회원이면 해당 페이지 접근 허용
  return <Outlet />;
}

export default MemberBlockRoute;
