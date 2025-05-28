import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../pages/FeedbackPage.css';

const feedbackData = {
  title: 'AI 분석 기반 피드백',
  items: [
    {
      heading: '문제 파악',
      content: '깊이 있는 답변 보강 필요 – 기술적인 질문에서 개념 설명이 부족한 부분이 있었습니다. 시간 관리 연습 필요 – 일부 답변이 길어져 면접 시간이 초과되었습니다.'
    },
    {
      heading: '강점 분석',
      content: '논리적인 문제 해결 능력 – 복잡한 문제를 체계적으로 접근하는 능력이 뛰어났습니다. 효과적인 커뮤니케이션 – 단어의 명확하고 설득력이 있었습니다. 기술 역량 – [프로그래밍 언어/기술 스택]에 대한 이해도가 높았습니다.'
    },
    {
      heading: '면접 팁',
      content: '예상 질문을 정리하고 답변을 연습해보세요. 기술 관련에서는 신규 적용 사례를 들어 설명하면 더욱 효과적입니다. STAR 기법(상황, 과제, 행동, 결과)을 활용하면 논리적인 답변을 구성할 수 있습니다.'
    }
  ]
};

const FeedbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const videoUrl = location.state?.videoUrl;

  return (
    <>
    <div className="header-container">
        <div className="title-box">
          <div className="gray-box"></div>
          <span className="title-text">피드백 확인</span>
        </div>
        <button className="exit-button" onClick={() => navigate('/interview-practice')}>나가기</button>
      </div>
      <hr className="hrline" />
    <div className="feedback-wrapper">
        <h2 className="feedback-title">김미림 님의 면접 피드백이 도착했어요!</h2>
        <div className="box-container">
          <div className="interview-section">
            <div className="interview-header">
              <img src="/icon.svg" alt="icon" />
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
              <div className="feedback-box">
                <h3 className="box-title">{feedbackData.title}</h3>
                {feedbackData.items.map((item, index) => (
                  <div key={index} className="feedback-item">
                    <h4 className="feedback-heading">{item.heading}</h4>
                    <p className="feedback-text">{item.content}</p>
                    <hr className='feedback-hr'/>
                  </div>
                ))}
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
