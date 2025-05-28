import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/InterviewMain.css';
import Header from '../components/header';
import characterImg from "../image/character.png";
import recentImg from "../image/recent-interview.png";
import companyImg from "../image/company-recommendation.png";

export default function InterviewMain() {
  const navigate = useNavigate();

  const handleGoToPractice = () => {
    navigate('/interview-practice');
  };

  return (
    <>
      <Header />
      <div className="main-container">
      {/* 면접 보러 가기 영역 */}
      <div className="go-interview-box" onClick={handleGoToPractice}>
        <div className="go-interview-content">
          <div className="go-interview-text">면접 보러 가기</div>
          <img src={characterImg} alt="캐릭터" className="character-image"/>
        </div>
      </div>

      {/* 최근 면접 & 회사추천 */}
      <div className="card-container">
        <div className="card">
          <img src={recentImg} alt="최근면접" className="card-image"/>
          <div className="card-title">최근면접</div>
        </div>
        <div className="card">
          <img src={companyImg}  alt="회사추천" className="card-image" />
          <div className="card-title">회사추천</div>
        </div>
      </div>
    </div>

    </>
  );
}
