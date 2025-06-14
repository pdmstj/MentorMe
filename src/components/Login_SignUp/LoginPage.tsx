import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Container, Form, Input, Button, Title, LinkSign, LinkSearch, LinkWrapper } from "./LoginPage_styles";
import { UserContext } from "../../contexts/UserContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Firebase Authentication 로그인
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firestore에서 추가 정보 가져오기
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("사용자 정보를 찾을 수 없습니다.");
        return;
      }

      const userData = querySnapshot.docs[0].data();

      // 콘솔 출력 추가
      console.log("로그인 성공, userData:", userData);

      // Context에 로그인 정보 저장
      login({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        birth: userData.birth,
      });

      alert(`${userData.name}님, 로그인되었습니다.`);
      navigate("/");
    } catch (error: any) {
      console.error("로그인 오류:", error.message);
      alert("이메일 또는 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <Container>
      <Title>로그인</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <LinkWrapper>
          <LinkSign as={Link} to="/signup">회원가입하기</LinkSign>
          <LinkSearch as={Link} to="/find">아이디 | 비밀번호 찾기</LinkSearch>
        </LinkWrapper>

        <Button type="submit">로그인</Button>
      </Form>
    </Container>
  );
}

export default LoginPage;
