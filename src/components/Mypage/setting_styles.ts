import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  font-family: 'Pretendard', sans-serif;
  font-size: 1rem;
  color: #333;
`;

export const FixedImage = styled.img`
position: relative;
top: 30px;
left: 45px;
width: 200px;
height: auto;
z-index: 999;
margin-bottom: 42px;
`;

export const Section = styled.section`
  margin: 3rem 0;
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 12px;
`;

export const Title = styled.h3`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1.2rem;
`;

export const SettingDropdown = styled.div`
  margin-top: 1rem;
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
`;

export const Select = styled.select`
  padding: 0.6rem 1rem;
  font-size: 0.95rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  width: 260px;
  appearance: none;
  background: url('data:image/svg+xml;utf8,<svg fill="%23333" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>') no-repeat right 1rem center;
  background-color: white;
  background-size: 16px 16px;
  border: 1px solid #ccc;
`;

export const InfoText = styled.p`
  margin: 0.4rem 0;
  font-size: 0.95rem;
  color: #555;
`;

export const InfoLink = styled.a`
  display: block;
  margin: 0.4rem 0;
  color: #2979ff;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #195dbb;
  }
`;

export const SwitchLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
`;

export const SwitchInput = styled.input`
  width: 42px;
  height: 24px;
  appearance: none;
  background-color: #ccc;
  border-radius: 999px;
  position: relative;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:checked {
    background-color: #2979ff;
  }

  &::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 3px;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s;
  }

  &:checked::before {
    transform: translateX(18px);
  }
`;

export const SwitchRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
`;

export const InfoRow = styled.p`
  margin: 0.5rem 0;
  color: #666;
  font-size: 0.95rem;
`;
