import styled from "styled-components";

export const PageWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  font-family: 'Pretendard', sans-serif;
`;

export const SectionBox = styled.div`
  background-color: #f9f9f9;
  padding: 32px;
  border-radius: 12px;
`;

export const SubTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const RecordCard = styled.div`
  background-color: white;
  padding: 30px 25px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

export const ContentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
`;

export const TypeBox = styled.div`
  width: 140px;
  font-weight: 600;
`;

export const FieldBox = styled.div`
  width: 180px;
  color: #333;
  font-size: 14px;
`;

export const DateText = styled.div`
  color: #000;
  font-size: 14px;
  font-weight: 600;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 10px;
  margin-bottom: 10px;
`;

export const LogoText = styled.span`
  font-size: 24px;
  font-weight: 800;
  color: #6482ed;
  font-family: 'Pretendard', sans-serif;
`;

export const FixedLogo = styled.img`
position: relative;
top: 10px;
left: 20px;
width: 200px;
height: auto;
z-index: 999;
margin-bottom: 1.5rem;
`;
