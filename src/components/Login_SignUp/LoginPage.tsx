import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import { Container, Form, Input, Button, Title, LinkSign, LinkSearch, LinkWrapper } from "./LoginPage_styles";
import { UserContext } from "../../contexts/UserContext"; // ✅ UserContext import

function LoginPage() {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate(); 
  const { login } = useContext(UserContext); // ✅ login 가져오기

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ✅ localStorage에서 회원가입한 정보 가져오기
    const storedUser = localStorage.getItem('registeredUser');
    if (!storedUser) {
      alert('가입된 정보가 없습니다.');
      return;
    }

    const parsedUser = JSON.parse(storedUser); 
    // { id, password, name, email, phone, birth } 저장되어있어야 해

    if (id === parsedUser.id && password === parsedUser.password) {
      // ✅ 모든 정보 넘기기
      login(parsedUser.name, parsedUser.email, parsedUser.phone, parsedUser.birth); 
      alert(`${parsedUser.name}님, 로그인되었습니다.`);
      navigate('/'); // 메인화면 이동
    } else {
      alert('아이디 또는 비밀번호가 틀렸습니다.');
    }
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Container>
      <Title>로그인</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={handleIdChange}
          required
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={handlePasswordChange}
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
