// authRegister.ts
// Firebase Auth 계정 생성 코드
// 로그인시 이메일로 로그인하기 위해서 코드 작성

import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "./firebase.js"

const registerUser = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("계정 생성 성공:", user);
    } catch (error: any) {
      console.error("회원가입 실패:", error.message);
    }
  };
  
  export default registerUser;