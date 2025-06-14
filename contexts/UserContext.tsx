import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// 학력 타입 정의
type Education = {
  school: string;
  major: string;
  startYear: string;
  endYear: string;
  status: string; // 예: '재학중', '졸업', '중퇴'
};

type License = {
  name: string;
  issuer: string;
  date: string;
};

export type User = {
  name: string;
  email: string;
  phone: string;
  birth: string;
  // 필요한 다른 필드는 optional로 둬도 됨
  uid?: string;
  id?: string;
  nickname?: string;
  createdAt?: string;
  updatedAt?: string;
  jobs?: string[];
  skills?: string[];
  licenses?: License[];
  experiences?: string[];
  awards?: string[];
  education?: Education;
};



type UserContextType = {
  user: User | null;
  updateUser: (user: User) => void;
  updateField: <K extends keyof User>(key: K, value: User[K]) => void;
  clearUser: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // localStorage에서 유저 정보 불러오기
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  // user 상태 변화 시 콘솔에 출력 (디버깅 용도)
  useEffect(() => {
    console.log("Current user in context:", user);
  }, [user]);

  // 전체 user 정보 업데이트
  const updateUser = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  // user의 특정 필드만 업데이트
  const updateField = <K extends keyof User>(key: K, value: User[K]) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      const updatedUser = { ...prevUser, [key]: value };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  // user 초기화
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        updateField,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// 커스텀 훅으로 UserContext 사용 편리하게
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUserContext must be used within a UserProvider");
  return context;
};
