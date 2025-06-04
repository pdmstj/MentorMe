import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecommendInterestPage.css'; // css 파일 따로 import
import planImg from '../image/plan.png';
import devImg from '../image/dev.png';
import designImg from '../image/design.png';

export default function RecommendInterestPage() {
  const navigate = useNavigate();

  const handleSkip = () => {
    navigate('/');
  };

  return (
    <div className="recommend-container">
      <h2 className="recommend-title">관심 직무를 선택해주세요</h2>
      <div className="options-container">
        <div className="option-card plan">
          <img src={planImg} alt="기획" width="80" />
          <div className="option-text">기획·경영·마케팅 직군</div>
        </div>
        <div className="option-card dev">
          <img src={devImg} alt="개발" width="80" />
          <div className="option-text">기술·개발 직군</div>
        </div>
        <div className="option-card design">
          <img src={designImg} alt="디자인" width="80" />
          <div className="option-text">디자인·미디어·콘텐츠 직군</div>
        </div>
      </div>
      <button className="skip-button" onClick={handleSkip}>건너뛰기</button>
    </div>
  );
}
