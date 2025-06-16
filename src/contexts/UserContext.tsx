import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";

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
  userJobCategories: string[];
  setUserJobCategories: React.Dispatch<React.SetStateAction<string[]>>;
  login: (userData: User) => void;
  logout: () => void;
}

// Context 생성
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider 컴포넌트
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userJobCategories, setUserJobCategories] = useState<string[]>([]);

  // localStorage에서 유저 정보와 직무 카테고리 가져오기
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedCategories = localStorage.getItem("userJobCategories");
    if (storedCategories) {
      setUserJobCategories(JSON.parse(storedCategories));
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
    setUserJobCategories([]);
    localStorage.removeItem("user");
    localStorage.removeItem("userJobCategories");
  };

  // userJobCategories가 변경될 때 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("userJobCategories", JSON.stringify(userJobCategories));
  }, [userJobCategories]);

  return (
    <UserContext.Provider
      value={{
        user,
        userJobCategories,
        setUserJobCategories,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// 커스텀 훅
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};