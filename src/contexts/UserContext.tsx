import { createContext, useState, useEffect, ReactNode } from "react";

// 유저 데이터 타입 정의
interface User {
  name: string;
  email: string;
  phone: string;
  birth: string;
}

interface UserContextType {
  user: User | null;
  login: (name: string, email: string, phone: string, birth: string) => void;
  logout: () => void;
}

// Context 생성
export const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

// Provider 컴포넌트
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // localStorage에서 유저 정보 가져오기
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 로그인 함수
  const login = (name: string, email: string, phone: string, birth: string) => {
    const userData: User = { name, email, phone, birth };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 로그아웃 함수
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
