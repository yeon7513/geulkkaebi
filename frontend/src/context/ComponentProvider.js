import { createContext, useContext, useState } from 'react';

const ComponentContext = createContext();

// 컨텍스트를 통해 현재 보여줄 컴포넌트를 상태로 관리하고
// 그 상태에 맞게 렌더링
export function ComponentProvider({ children }) {
  const [currComp, setCurrComp] = useState(null);

  return (
    <ComponentContext.Provider value={{ currComp, setCurrComp }}>
      {children}
    </ComponentContext.Provider>
  );
}

export function useComponentContext() {
  return useContext(ComponentContext);
}
