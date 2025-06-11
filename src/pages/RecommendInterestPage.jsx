import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './RecommendInterestPage.css';
import planImg from '../image/plan.png';
import devImg from '../image/dev.png';
import designImg from '../image/design.png';

export default function RecommendInterestPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const type = location.state?.type;

  const handleSkip = () => {
    const nextPage = type === '대화형' ? '/conversation-practice' : '/self-practice';
    // ✅ 건너뛰기일 때 interest: "건너뛰기"로 명시
    navigate(nextPage, { state: { type, interest: "건너뛰기" } });
  };
  
  const handleSelect = (interest) => {
    const nextPage = type === '대화형' ? '/conversation-practice' : '/self-practice';
    navigate(nextPage, { state: { type, interest } });
  };

  return (
    <div className="recommend-container">
      <h2 className="recommend-title">관심 직무를 선택해주세요</h2>
      <p className="recommend-subtext">
        <strong>건너뛰기</strong>를 누르면 선택한 역할과 관계없이 <span className="highlight">인성 질문</span>만 출제됩니다.
      </p>
      <div className="options-container">
        <div className="option-card plan" onClick={() => handleSelect("기획")}>
          <img src={planImg} alt="기획" width="80" />
          <div className="option-text">기획·경영·마케팅 직군</div>
        </div>
        <div className="option-card dev" onClick={() => handleSelect("개발")}>
          <img src={devImg} alt="개발" width="80" />
          <div className="option-text">기술·개발 직군</div>
        </div>
        <div className="option-card design" onClick={() => handleSelect("디자인")}>
          <img src={designImg} alt="디자인" width="80" />
          <div className="option-text">디자인·미디어·콘텐츠 직군</div>
        </div>
      </div>
      <button className="skip-button" onClick={handleSkip}>건너뛰기</button>
    </div>
  );
}
