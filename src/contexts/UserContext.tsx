import { createContext, useState, useEffect, ReactNode, useContext } from "react";

// 유저 데이터 타입 정의 (필요한 필드 모두 추가)
interface User {
  uid?: string;
  id?: string;
  name: string;
  email: string;
  phone: string;
  birth: string;
  nickname?: string;
  experiences?: any[];  // 구체 타입으로 변경 권장
  awards?: any[];
  education?: any[];
  createdAt?: string | Date;
}

interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
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

  // 로그인 함수 (User 전체 객체 받도록 수정)
  const login = (userData: User) => {
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

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
