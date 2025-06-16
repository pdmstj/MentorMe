import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../pages/FeedbackPage.css';
import logoImg from "../image/mentorme_logo.png";
import feedbackImg from "../image/feedback.png";
import { useUserContext } from "../contexts/UserContext";

const FeedbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const videoUrl = location.state?.videoUrl;
  const sttText = location.state?.sttText;
  const type = location.state?.type;
  const expressionResult = location.state?.expressionResult || {};
  const expressionFrames = expressionResult?.frames || [];
  const { user } = useUserContext();
  const username = user?.name || "사용자";

  const [feedbackSummary, setFeedbackSummary] = useState(null);
  const [feedbackError, setFeedbackError] = useState(null);

  useEffect(() => {
    const fetchFeedbackFromGPT = async () => {
      try {
        const response = await fetch("http://localhost:5002/generate-feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sttText, type }),
        });

        const data = await response.json();
        console.log("🧠 GPT 응답 결과:", data);
        if (data.error) {
          setFeedbackError(data.error);
        } else {
          setFeedbackSummary(data);
        }
      } catch (error) {
        console.error("GPT 피드백 요청 실패:", error);
        setFeedbackError("GPT 피드백 요청 실패");
      }
    };

    if (sttText && !feedbackSummary && !feedbackError) {
      fetchFeedbackFromGPT();
    }
  }, [sttText, type, feedbackSummary, feedbackError]);

  const handleSave = async () => {
    if (!videoUrl) {
      alert("저장할 영상이 없습니다.");
      return;
    }

    try {
      const res = await fetch(videoUrl);
      const videoBlob = await res.blob();
      const videoFile = new File([videoBlob], 'feedback_video.webm', { type: 'video/webm' });

      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('sttText', sttText || '');
      formData.append('expressionResult', JSON.stringify(expressionResult || {}));
      formData.append('user', user);

      const response = await fetch('http://localhost:5002/save-feedback', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errData = await response.text();
        console.error("백엔드 응답:", errData);
        throw new Error("서버 오류 발생");
      }

      alert("저장 완료! ✅");
    } catch (err) {
      console.error("영상 저장 중 오류:", err);
      alert("영상 저장 실패 ❌");
    }
  };

  return (
    <>
      <div className="header-container">
        <div className="title-box">
          <div className="title-logo">
            <img src={logoImg} alt="로고" className='logo-img' />
          </div>
          <span className="title-text">피드백 확인</span>
        </div>
        <button className="exit-button" onClick={() => navigate('/interview-practice')}>나가기</button>
      </div>
      <hr className="hrline" />

      <div className="feedback-wrapper">
        <h2 className="feedback-title">{username} 님의 면접 피드백이 도착했어요!</h2>
        <div className="box-container">

          {/* 🎥 영상 */}
          <div className="interview-section">
            <div className="interview-header">
              <img src={feedbackImg} alt="icon" />
              <span><strong>{username}</strong> 님의 면접 내용</span>
            </div>

            <div className="video-box">
              {videoUrl ? (
                <video src={videoUrl} controls className="feedback-video" />
              ) : (
                <p>전달된 영상이 없습니다. 먼저 녹화를 진행해주세요.</p>
              )}
            </div>
          </div>

          {/* 📋 피드백 박스 */}
          <div className="feedback-box">
            <h3 className="box-title">AI 분석 기반 피드백</h3>
            <div className="feedback-item">
              <h4 className="feedback-heading">📝 인식된 답변</h4>
              <p className="feedback-text">
                {sttText || "분석된 텍스트가 없습니다. 다시 시도해주세요."}
              </p>
              <hr className="feedback-hr" />
            </div>

            {feedbackError && (
              <p className="feedback-text error">❗{feedbackError}</p>
            )}

            {feedbackSummary?.strengths?.length > 0 && (
              <>
                <div className="feedback-item">
                  <h4 className="feedback-heading">🌟 강점 분석</h4>
                  <ul className="feedback-text">
                    {feedbackSummary.strengths.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                  <hr className="feedback-hr" />
                </div>

                <div className="feedback-item">
                  <h4 className="feedback-heading">🛠️ 보완점</h4>
                  <ul className="feedback-text">
                    {feedbackSummary.improvements.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                  <hr className="feedback-hr" />
                </div>

                <div className="feedback-item">
                  <h4 className="feedback-heading">💡 면접 팁</h4>
                  <ul className="feedback-text">
                    {feedbackSummary.tips.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                  <hr className="feedback-hr" />
                </div>
              </>
            )}

            {/* 📸 표정/자세 분석 결과 */}
            {expressionFrames?.length > 0 && (
              <div className="feedback-item">
                <h4 className="feedback-heading">😃 표정 및 자세 분석 종합 요약</h4>
                <p className="feedback-text">
                  전체 면접 영상 중 <strong>{expressionFrames.filter(f => f.face_detected).length}</strong>개의 구간에서 얼굴이 정확히 인식되었습니다.<br />
                  자세 안정도 평균은 <strong>{
                    Math.round(expressionFrames.reduce((sum, f) => sum + f.posture_score, 0) / expressionFrames.length * 100)
                  }</strong>점으로, 전반적으로 <strong>바른 자세를 유지한 모습</strong>이 관찰되었습니다.
                </p>

                <h4 className="feedback-heading">⏱️ 구간별 분석 결과</h4>
                <ul className="feedback-text">
                  {expressionFrames.map((frame, index) => {
                    const postureScore = Math.round(frame.posture_score * 100);
                    const { time, face_detected, expression, gaze } = frame;

                    return (
                      <li key={index}>
                        🕒 {time} —{" "}
                        {face_detected ? (
                          <>
                            얼굴 인식 <strong>✅</strong>, 자세 <strong>{postureScore}점</strong>, 표정 <strong>{expression}</strong>, 시선 <strong>{gaze}</strong><br />
                            → 집중도 높고 안정적인 인상을 주는 구간입니다.
                          </>
                        ) : (
                          <>
                            얼굴 인식 <strong>실패 ⚠️</strong>, 자세 <strong>{postureScore}점</strong><br />
                            → 얼굴이 화면에 잘 보이지 않아 면접관과의 시선 교환이 어려웠을 수 있어요.
                          </>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <hr className="feedback-hr" />
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="recheck-msg">결과는 <a href="/mypage">마이페이지&gt;최근 면접 보기</a> 에서 다시 확인할 수 있어요</p>

      <div className="button-group">
        <button className="btn" onClick={handleSave}>저장</button>
        <button className="btn">삭제</button>
      </div>
    </>
  );
};

export default FeedbackPage;
