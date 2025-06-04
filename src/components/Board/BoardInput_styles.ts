import styled from 'styled-components';

// 모든 요소
export const Container = styled.div`
  display: flex;
  justify-content: center;   // 가로 중앙
  align-items: center;       // 세로 중앙
  height: 100vh;             // 화면 높이 꽉 채움
  flex-direction: column;
`;

// 입력 폼
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 600px;
`;

// input 위 라벨
export const Label = styled.label`
  font-family: 'Pretendard', sans-serif;
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
`;

// 제목 입력
export const Input = styled.input`
  font-family: 'Pretendard', sans-serif;
  width: 100%;
  height: 50px;
  background-color: #F1F1F1;
  padding: 0 20px;
  font-size: 18px;
  border-radius: 8px;
  border: 1px solid #F1F1F1;
  box-sizing: border-box;
  outline: none;
  margin-bottom: 20px;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: #ACACAC;
    font-size: 16px;
  }

  &:focus {
    border: 2px solid #d0d0d0;
  }
`;

// 내용 입력
export const Textarea = styled.textarea`
  font-family: 'Pretendard', sans-serif;
  width: 100%;
  height: 200px;
  background-color: #F1F1F1;
  padding: 20px;
  font-size: 18px;
  border-radius: 8px;
  border: 1px solid #F1F1F1;
  box-sizing: border-box;
  outline: none;
  resize: none;
  margin-bottom: 50px;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: #ACACAC;
    font-size: 16px;
  }

  &:focus {
    border: 2px solid #d0d0d0;
  }
`;

// 주제 선택 상자
export const Select = styled.select`
  font-family: 'Pretendard', sans-serif;
  width: 100%;
  height: 50px;
  background-color: #F1F1F1;
  padding: 0 40px 0 20px; /* 오른쪽 여백 늘림 */
  font-size: 18px;
  border-radius: 8px;
  border: 1px solid #F1F1F1;
  box-sizing: border-box;
  outline: none;
  margin-bottom: 20px;
  transition: border-color 0.3s ease;

  // 기본 화살표 없애기
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  // 커스텀 화살표
  background-image: url('data:image/svg+xml;utf8,<svg fill="black" height="12" viewBox="0 0 24 24" width="12" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 16px center; /* ← 위치 조정 */
  background-size: 30px 30px; /*화살표 크기*/

  &:focus {
    border: 2px solid #d0d0d0;
  }
`;

// 작성완료 버튼
export const Button = styled.button`
  font-family: 'Pretendard', sans-serif;
  background-color: #6482ED;
  width: 100%;
  height: 60px;
  color: white;
  font-size: 22px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4b6fb3;
  }

  &:focus {
    outline: none;
  }
`;


