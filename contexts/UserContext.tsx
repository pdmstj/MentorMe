import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// User 및 License 타입 정의
type License = {
  name: string;
  date: string;
};

type User = {
  id: string;
  nickname: string;
  email: string;
  job: string;
  jobs: string[];
  skill: string;
  skills: string[];
  licenses: License[];
  profileImage: string;
};

// 기본 사용자 객체
const defaultUser: User = {
  id: "",
  nickname: "",
  email: "",
  job: "",
  jobs: [],
  skill: "",
  skills: [],
  licenses: [],
  profileImage: "",
};

// Context 타입 정의
type UserContextType = {
  user: User | null;
  setUser: (user: User) => Promise<void>;
  updateNickname: (nickname: string) => void;
  updateJobs: (jobs: string[]) => void;
  updateSkills: (skills: string[]) => void;
  updateLicenses: (licenses: License[]) => void;
  updateProfileImage: (url: string) => void;
};

// Context 생성
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider 컴포넌트
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  const setUser = async (newUser: User) => {
    setUserState(newUser);
  };

  const updateNickname = (nickname: string) => {
    if (user) {
      setUserState({ ...user, nickname });
    }
  };

  const updateJobs = (jobs: string[]) => {
    if (user) {
      setUserState({ ...user, jobs });
    }
  };

  const updateSkills = (skills: string[]) => {
    if (user) {
      setUserState({ ...user, skills });
    }
  };

  const updateLicenses = (licenses: License[]) => {
    if (user) {
      setUserState({ ...user, licenses });
    }
  };

  const updateProfileImage = (url: string) => {
    if (user) {
      setUserState({ ...user, profileImage: url });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateNickname,
        updateJobs,
        updateSkills,
        updateLicenses,
        updateProfileImage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// 커스텀 훅
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
