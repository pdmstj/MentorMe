import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/InterviewPracticePage.css';
import Header from '../components/header';
import frame34 from "../image/Frame 34.svg";

export default function InterviewPracticePage() {
  const [activeTab, setActiveTab] = useState('뷰인터 시작');
  const navigate = useNavigate();

  // 🔧 대화형 / 셀프 구분되는 명확한 type 값 전달
  const handleClick = (type) => { 
    console.log(`${type} 버튼 클릭됨`);
    navigate('/mic-camera-check', { state: { type } });
  };

  const renderContent = () => {
    if (activeTab === '뷰인터 시작') {
      return (
        <div className="cards">
          {/* 대화형 실전 면접 */}
          <div className="practice-card">
            <h2 className="practice-card-title">대화형 실전 면접</h2>
            <ul className="practice-card-list">
              <li className="practice-card-contents">AI면접관과 함께 구조화된 면접 연습</li>
              <li className="practice-card-contents">랜덤 질문을 통해 실제 면접과 같은 환경 제공</li>
              <li className="practice-card-contents">답변 내용을 분석한 AI면접관의 피드백 제공</li>
            </ul>
            <hr className="hrline"/>
            <div className="info-box">
              <div className="info-header">
                <img className="img" alt="Frame" src={frame34} />
                <p className="info-title">면접 연습 진행 안내</p>
              </div>
              <p>1. 마이크 점검 → 2. 역할 선택 → 3. 연습 시작</p>
              <p>4. 연습 종료 → 5. 결과 피드백 확인</p>
            </div>
            <button className="button" onClick={() => handleClick('대화형')}>연습하기</button>
          </div>

          {/* 셀프 연습 면접 */}
          <div className="practice-card">
            <h2 className="practice-card-title">셀프 연습 면접</h2>
            <ul className="practice-card-list">
              <li className="practice-card-contents">웹캠 영상과 질문 동시 표시로 실전과 유사한 환경 제공</li>
              <li className="practice-card-contents">녹화를 통해 자신의 답변을 저장하고 이후 스스로 피드백 가능</li>
              <li className="practice-card-contents">부담 없이 답변 흐름과 표현을 연습하며 개선할 수 있도록 지원</li>
            </ul>
            <hr className="hrline"/>
            <div className="info-box">
              <div className="info-header">
                <img className="img" alt="Frame" src={frame34} />
                <p className="info-title">면접 연습 진행 안내</p>
              </div>
              <p>1. 마이크 점검 → 2. 역할 선택 → 3. 연습 시작</p>
              <p>4. 연습 종료 → 5. 결과 피드백 확인</p>
            </div>
            <button className="button" onClick={() => handleClick('셀프')}>연습하기</button>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="title" style={{ textAlign: 'left' }}>면접 연습</h1>
        <hr className='hrline-title'/>

        {/* 탭 메뉴 */}
        <div className="tab-menu">
          {['뷰인터 시작'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 탭 내용 */}
        {renderContent()}
      </div>
    </>
  );
}
