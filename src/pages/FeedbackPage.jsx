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
  const question = location.state?.question || "면접 질문 정보가 없습니다.";
  const expressionResult = location.state?.expressionResult || {};
  const expressionFrames = expressionResult?.frames || [];
  const [feedbackSummary, setFeedbackSummary] = useState(null);
  const [feedbackError, setFeedbackError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const { user } = useUserContext();
  const username = user?.name || "사용자";

  // GPT 피드백 요청
  useEffect(() => {
    const fetchGPTFeedback = async () => {
      try {
        const response = await fetch("http://localhost:5002/generate-feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sttText, type })
        });

        const data = await response.json();
        if (data.error) {
          setFeedbackError(data.error);
        } else {
          setFeedbackSummary(data);
        }
      } catch (err) {
        console.error("GPT 피드백 오류:", err);
        setFeedbackError("GPT 피드백 요청 실패");
      } finally {
        setLoading(false);
      }
    };

    if (sttText) fetchGPTFeedback();
    else setLoading(false);
  }, [sttText, type]);

  // 자동 저장
  useEffect(() => {
    const autoSave = async () => {
      if (!videoUrl || !sttText || !feedbackSummary || !expressionResult || saved) return;

      try {
        const res = await fetch(videoUrl);
        const videoBlob = await res.blob();
        const videoFile = new File([videoBlob], 'feedback_video.webm', { type: 'video/webm' });

        const formData = new FormData();
        formData.append('video', videoFile);
        formData.append('sttText', sttText);
        formData.append('expressionResult', JSON.stringify(expressionResult));
        formData.append('gptFeedback', JSON.stringify(feedbackSummary));
        formData.append('question', question);
        formData.append('type', type);
        formData.append('timestamp', new Date().toISOString());
        formData.append('user', username);
        formData.append('video_path', videoUrl); // ✅ 추가됨

        const response = await fetch('http://localhost:5002/save-feedback', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          console.log("✅ 자동 저장 완료");
          setSaved(true);
        } else {
          throw new Error("서버 오류 발생");
        }
      } catch (err) {
        console.error("❌ 자동 저장 실패:", err);
      }
    };

    if (!loading) autoSave();
  }, [loading, videoUrl, sttText, feedbackSummary, expressionResult, saved, username, question, type]);

  // 수동 저장
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
      formData.append('gptFeedback', JSON.stringify(feedbackSummary || {}));
      formData.append('question', question);
      formData.append('type', type);
      formData.append('timestamp', new Date().toISOString());
      formData.append('user', username);
      formData.append('video_path', videoUrl); // ✅ 추가됨

      const response = await fetch('http://localhost:5002/save-feedback', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error("서버 오류 발생");

      alert("저장 완료! ✅");
    } catch (err) {
      console.error("저장 오류:", err);
      alert("영상 저장 실패 ❌");
    }
  };

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="spinner" />
        <p>🌀 AI 피드백 분석 중입니다. 잠시만 기다려주세요...</p>
      </div>
    );
  }

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

          <div className="feedback-box">
            <h3 className="box-title">AI 분석 기반 피드백</h3>

            <div className="feedback-item">
              <h4 className="feedback-heading">❓ 면접 질문</h4>
              <p className="feedback-text">{question}</p>
              <hr className="feedback-hr" />
            </div>

            <div className="feedback-item">
              <h4 className="feedback-heading">📝 인식된 답변</h4>
              <p className="feedback-text">{sttText || "분석된 텍스트가 없습니다."}</p>
              <hr className="feedback-hr" />
            </div>

            {feedbackError && <p className="feedback-text error">❗{feedbackError}</p>}

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

            {expressionFrames.length > 0 && (
              <div className="feedback-item">
                <h4 className="feedback-heading">📸 표정 및 자세 종합 피드백</h4>
                <div className="feedback-text">
                  {
                    (() => {
                      let totalPosture = 0;
                      let count = expressionFrames.length;
                      let goodPosture = 0;
                      let gazeFront = 0;
                      let smiles = 0;
                      let faceDetectFail = 0;

                      expressionFrames.forEach(f => {
                        totalPosture += f.posture_score || 0;
                        if ((f.posture_score || 0) > 0.8) goodPosture++;
                        if (f.gaze === "정면 응시") gazeFront++;
                        if (f.expression === "웃는 표정") smiles++;
                        if (!f.face_detected) faceDetectFail++;
                      });

                      const avgPosture = totalPosture / count;
                      const avgScore = Math.round(avgPosture * 100);

                      return (
                        <>
                          <p><strong>✔️ 평균 자세 점수:</strong><br /> {avgScore}점</p>
                          <p><strong>📌 자세 요약:</strong><br />
                            {goodPosture >= count * 0.7
                              ? "대체로 바른 자세를 유지하였습니다."
                              : "자세가 불안정한 구간이 자주 발견되었습니다."}
                          </p>
                          <p><strong>👀 시선 분석:</strong><br />
                            {gazeFront >= count * 0.7
                              ? "시선을 정면에 잘 유지하였습니다."
                              : "시선이 자주 흐트러졌습니다."}
                          </p>
                          <p><strong>😊 표정 분석:</strong><br />
                            {smiles > 0
                              ? "밝은 표정을 보여준 구간도 확인되었습니다."
                              : "표정 변화가 거의 없거나 중립적인 인상이 많았습니다."}
                          </p>
                          {faceDetectFail > 0 && (
                            <p><strong>⚠️ 얼굴 인식 실패:</strong><br />
                              얼굴 인식에 실패한 구간이 <strong>{faceDetectFail}개</strong> 존재하여 일부 분석이 누락되었을 수 있습니다.
                            </p>
                          )}
                        </>
                      );
                    })()
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="recheck-msg">결과는 <a href="/mypage">마이페이지&gt;최근 면접 보기</a> 에서 다시 확인할 수 있어요</p>
    </>
  );
};

export default FeedbackPage;
