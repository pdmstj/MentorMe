import styled from 'styled-components';
import Slider from 'react-slick';

export interface Company {
  id: string;
  name: string;
  description: string;
  image?: string;
  tags: string[];
  isFavorite?: boolean;
  heartCount: number;
}

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard', sans-serif;
  background: #fff;
  padding: 0 24px;
  box-sizing: border-box;
  overflow-x: hidden;
`;


export const StyledSlider = styled(Slider)`
  width: 100%;
  margin: 50px 0;

  .slick-track {
    display: flex !important;
    gap: 40px; 
  }

  .slick-slide {
    display: flex !important;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 20px; 
  }

  .slick-prev,
  .slick-next {
    display: none; /* 기본 화살표 숨기기 */
  }

  .slick-disabled {
    opacity: 0.3;
    pointer-events: none;
  }
`;

export const Title = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin-top: 0; /* 상단 여백 제거 */
  color: #222;
  text-align: center;
`;

export const CardArea = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  display: block;
  overflow: hidden;  /* 나머지 카드 가림 */
`;

export const CardList = styled.div`
  display: flex;
  gap: 30px; 
  justify-content: center; 
  width: 100%;
  flex-wrap: nowrap; /* 카드들이 한 줄에 나열되도록 설정 */
  transition: transform 0.5s ease-in-out;
`;

export const Card = styled.div`
  width: 335px !important; 
  min-height: 540px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    z-index: 1;
  }
`;

export const CardImage = styled.div<{ src?: string }>`
  width: 100%;
  height: 360px;
  border-radius: 16px 16px 0 0;
  background: ${({ src }) =>
    src
      ? `url(${src}) center/cover no-repeat`
      : `repeating-linear-gradient(45deg, #eee, #f5f5f5 10px, #eee 20px)`};
`;

export const CardBody = styled.div`
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

export const CardTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const CardTitle = styled.div`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 8px;
  color: #222;
`;

export const CardDesc = styled.div`
  font-size: 16px;
  color: #555;
  margin-bottom: 24px;
  line-height: 1.5;
  flex: 0 0 72px; /* 2줄 기준으로 높이 고정 (16px * 1.5 * 2) */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 최대 줄 수 제한 */
  -webkit-box-orient: vertical;
`;


export const TagList = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export const Tag = styled.span`
  background: #f0f1f4;
  border-radius: 8px;
  padding: 4px 12px;
  font-size: 14px;
  color: #4263eb;
  font-weight: 500;
`;

export const HeartButton = styled.button`
  background: none;
  border: none;
  font-size: 25px;
  color: #4263ed;
  cursor: pointer;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const HeartCount = styled.span`
  font-size: 10px;
  color: #4263ed;
  font-weight: 500;
`;

export const InfoText = styled.div`
  font-size: 16px;
  color: #888;
  text-align: center;
`;

export const Highlight = styled.span`
  color: #6482ED;
  font-weight: 600;
`;


export const ArrowButton = styled.button`
  background: #fff;
  border: none;
  border-radius: 50%;
  color: #6482ED;
  width: 60px;
  height: 60px;
  font-size: 40px;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  margin: 0 15px;
  flex-shrink: 0; /* 버튼이 줄어들지 않도록 설정 */
  &:hover {
    background: #f0f1f4;
  }
  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`
;