// 이 컨텍스트를 만든 이유.
// 비회원 접근을 모든 컴포넌트에서 반복적으로 하고 있다고 느낌.
// 컨텍스트로 관리하면 어떨까? 해서 도전~!

import { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isLogin, status } = useSelector((state) => state.userSlice);

  return (
    <AuthContext.Provider value={{ isLogin, status }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
