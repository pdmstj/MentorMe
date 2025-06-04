import styled from 'styled-components';


// 모든 요소
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; // 수평 중앙
    justify-content: center; // 수직 중앙
    height: 100vh;  // 브라우저 화면 높이의 100%
`;

// 회원가입 제목을 뺀 모든 요소
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center; // 요소들을 가운데로
`;

// 회원가입 제목
export const Title = styled.h2`
    font-family: 'Pretendard', sans-serif;
    text-align: center;
    font-size: 30px;
    margin-bottom: 70px;
`;

// input박스와 레이블 스타일
export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
`;

export const Label = styled.label`
    font-family: 'Pretendard', sans-serif;
    font-size: 20px;
    color: #5A5A5A; 
    margin-bottom: 14px;  // 인풋박스와 레이블 사이에 여백 추가
`;

// input박스
export const Input = styled.input`
    font-family: 'Pretendard', sans-serif;
    width: 400px;
    height: 50px;
    font-size: 18px;
    color: black;
    border: 1px solid #E2E2E2;
    border-radius: 8px;
    padding: 0 20px;
    box-sizing: border-box;
    outline: none;
    margin-bottom: 14px;
    transition: border-color 0.3s ease;  // 테두리 색이 부드럽게 변하도록 설정

    &::placeholder {
    color: #ACACAC;  // 글씨 색
    }

    &:focus {
        border-color: #5A5A5A;  // 포커스 시 테두리 색상 어두운 회색으로 설정
    }
`;

// 버튼 스타일
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
    margin-top: 67px; 

    &:hover {
    background-color: #4b6fb3; // 호버 시 더 어두운 색으로 변경 
    }

    &:focus {
    outline: none; // 포커스 시 outline 없애기 
    }
`;
