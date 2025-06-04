import styled from 'styled-components';

// 모든 요소
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; // 수평 중앙
  justify-content: center; // 수직 중앙
  height: 100vh;  // 브라우저 화면 높이의 100%
`;

// 로그인 제목
export const Title = styled.h2`
  font-family: 'Pretendard', sans-serif;
  text-align: center;
  font-size: 30px;
  margin-bottom: 48px;
`;

// 제목을 뺀 모든 요소
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center; // 요소들을 가운데로
`;

// input박스
export const Input = styled.input`
  font-family: 'Pretendard', sans-serif;
  width: 400px;
  height: 50px;
  background-color: #F1F1F1; //인풋박스 배경색
  padding: 0 20px;
  font-size: 18px;
  border-radius: 8px;
  border: 1px solid #F1F1F1;
  box-sizing: border-box;
  outline: none;
  margin-bottom: 22px;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: #ACACAC;
    font-size: 16px;
  } //힌트

  &:focus {
    border: 2px solid #e0e0e0; 
  } // 포커스 했을때 테두리만 진하게 

  &:last-of-type {
    margin-bottom: 15px;
  } // 마지막 input만 margin-bottom 다르게 
`;

// 링크 전체를 감쌈
export const LinkWrapper = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 42px;
`;

// 왼쪽 링크
export const LinkSign = styled.a`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  color: #5A5A5A;
  text-decoration: none;
`;

// 오른쪽 링크
export const LinkSearch = styled.a`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  color: #5A5A5A;
  text-decoration: none;
`;

// 버튼
export const Button = styled.button`
  font-family: 'Pretendard', sans-serif;
  background-color: #6482ED; // 버튼 배경색 
  width: 400px;
  height: 60px;
  color: white; // 글씨 색상 
  font-size: 22px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-sizing: border-box;
  transition: background-color 0.3s ease; // 배경색 전환 효과 

  &:hover {
    background-color: #4b6fb3; // 호버 시 더 어두운 색으로 변경 
  }

  &:focus {
    outline: none; // 포커스 시 outline 없애기 
  }
`;