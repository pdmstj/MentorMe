import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Input, Button, Title, Label, InputWrapper } from "./SignupPage_styles";
import { UserContext } from "../../contexts/UserContext"; // ✅ UserContext 가져오기

function SignupPage() {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    phone: "",  // ✅ 추가
    birth: "",  // ✅ 추가
  });

  const { login } = useContext(UserContext); // ✅ login 함수
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // ✅ localStorage에 유저 정보 저장
    const userData = {
      id: formData.id,
      password: formData.password,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,    // ✅ 저장
      birth: formData.birth,    // ✅ 저장
    };
    localStorage.setItem('registeredUser', JSON.stringify(userData));

    // ✅ context에도 바로 로그인 (이름 + 이메일 + 전화번호 + 생일)
    login(formData.name, formData.email, formData.phone, formData.birth); 

    alert("회원가입이 완료되었습니다. 메인페이지로 이동합니다.");
    navigate('/'); // 메인페이지로 이동
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <Label htmlFor="id">아이디</Label>
          <Input
            type="text"
            id="id"
            name="id"
            placeholder="아이디"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="name">이름</Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="이름"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="email">이메일</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </InputWrapper>

        {/* ✅ 전화번호 입력 */}
        <InputWrapper>
          <Label htmlFor="phone">전화번호</Label>
          <Input
            type="text"
            id="phone"
            name="phone"
            placeholder="전화번호"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </InputWrapper>

        {/* ✅ 생년월일 입력 */}
        <InputWrapper>
          <Label htmlFor="birth">생년월일</Label>
          <Input
            type="date"
            id="birth"
            name="birth"
            value={formData.birth}
            onChange={handleChange}
            required
          />
        </InputWrapper>

        <Button type="submit">회원가입</Button>
      </Form>
    </Container>
  );
}

export default SignupPage;
