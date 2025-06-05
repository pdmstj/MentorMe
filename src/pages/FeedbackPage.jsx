import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../pages/FeedbackPage.css';
import logoImg from "../image/mentorme_logo.png";
import feedbackImg from "../image/feedback.png";

const FeedbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const videoUrl = location.state?.videoUrl;
  const sttText = location.state?.sttText; // 🔥 Whisper 텍스트 받아오기

  // 🧠 임시: STT로 받은 답변을 기반으로 분석 결과 생성
  const feedbackSummary = sttText
    ? {
        strengths: [
          "명확한 커뮤니케이션 능력: 질문의 요점을 정확하게 이해하고 답변했습니다.",
          "논리적인 사고: 답변이 체계적이고 구조적으로 구성되어 있었습니다.",
          "태도: 면접 내내 밝고 자신감 있는 태도를 유지했습니다."
        ],
        improvements: [
          "답변 시간을 관리하세요: 일부 답변이 길어지는 경향이 있습니다.",
          "구체적인 사례 추가: 경험을 뒷받침하는 구체적인 사례가 부족했습니다."
        ],
        tips: [
          "STAR 기법(상황, 과제, 행동, 결과)을 활용해 경험을 더 구체적으로 설명하세요.",
          "면접 예상 질문 리스트를 만들어 사전 연습을 해보세요."
        ]
      }
    : null;

  return (
    <>
      <div className="header-container">
        <div className="title-box">
          <div className="title-logo">
            <img src={logoImg} alt="로고" className='logo-img'/>
          </div>
          <span className="title-text">피드백 확인</span>
        </div>
        <button className="exit-button" onClick={() => navigate('/interview-practice')}>나가기</button>
      </div>
      <hr className="hrline" />

      <div className="feedback-wrapper">
        <h2 className="feedback-title">김미림 님의 면접 피드백이 도착했어요!</h2>
        <div className="box-container">
          {/* 왼쪽 영상 부분 */}
          <div className="interview-section">
            <div className="interview-header">
              <img src={feedbackImg} alt="icon" />
              <span><strong>김미림</strong> 님의 면접 내용</span>
            </div>
            <div className="video-box">
              {videoUrl ? (
                <video src={videoUrl} controls className="feedback-video" />
              ) : (
                <p>전달된 영상이 없습니다. 먼저 녹화를 진행해주세요.</p>
              )}
            </div>
          </div>

          {/* 오른쪽 피드백 부분 */}
          <div className="feedback-box">
            <h3 className="box-title">AI 분석 기반 피드백</h3>

            {/* 인식된 답변 */}
            <div className="feedback-item">
              <h4 className="feedback-heading">📝 인식된 답변</h4>
              <p className="feedback-text">
                {sttText ? sttText : "분석된 텍스트가 없습니다. 다시 시도해주세요."}
              </p>
              <hr className="feedback-hr" />
            </div>

            {/* 강점 분석 */}
            {feedbackSummary && (
              <>
                <div className="feedback-item">
                  <h4 className="feedback-heading">🌟 강점 분석</h4>
                  <ul className="feedback-text">
                    {feedbackSummary.strengths.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <hr className="feedback-hr" />
                </div>

                {/* 보완점 */}
                <div className="feedback-item">
                  <h4 className="feedback-heading">🛠️ 보완점</h4>
                  <ul className="feedback-text">
                    {feedbackSummary.improvements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <hr className="feedback-hr" />
                </div>

                {/* 면접 팁 */}
                <div className="feedback-item">
                  <h4 className="feedback-heading">💡 면접 팁</h4>
                  <ul className="feedback-text">
                    {feedbackSummary.tips.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <hr className="feedback-hr" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <p className="recheck-msg">결과는 <a href="/mypage">마이페이지&gt;최근 면접 보기</a> 에서 다시 확인할 수 있어요</p>

      <div className="button-group">
        <button className="btn">저장</button>
        <button className="btn">삭제</button>
      </div>
    </>
  );
};

export default FeedbackPage;
