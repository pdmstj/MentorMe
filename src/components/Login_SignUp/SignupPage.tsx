import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Input, Button, Title, Label, InputWrapper } from "./SignupPage_styles";
import { UserContext } from "../../contexts/UserContext";
import { db, auth } from "../../firebase";
import { doc, setDoc } from "firebase/firestore"; // 🔥 setDoc 추가
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignupPage() {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    phone: "",
    birth: "",
  });

  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // Firebase Auth에 계정 생성
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Firestore에 유저 정보 저장 (문서 ID를 user.uid로 지정)
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        id: formData.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        birth: formData.birth,
        createdAt: new Date(),
      });

      // Context에 로그인 처리
      login(formData.name, formData.email, formData.phone, formData.birth);

      alert("회원가입이 완료되었습니다!");
      navigate("/");
    } catch (error: any) {
      console.error("회원가입 오류:", error.message);
      alert("회원가입 중 오류가 발생했습니다: " + error.message);
    }
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
          <Input type="text" id="id" name="id" value={formData.id} onChange={handleChange} required />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="password">비밀번호</Label>
          <Input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          <Input type="password" id="confirmPassword" name="confirmPassword" placeholder="비밀번호 확인" value={formData.confirmPassword} onChange={handleChange} required />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="name">이름</Label>
          <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="email">이메일</Label>
          <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="phone">전화번호</Label>
          <Input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="birth">생년월일</Label>
          <Input type="date" id="birth" name="birth" value={formData.birth} onChange={handleChange} required />
        </InputWrapper>

        <Button type="submit">회원가입</Button>
      </Form>
    </Container>
  );
}

export default SignupPage;
