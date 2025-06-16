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
            {expressionFrames.map((frame, index) => {
              const postureScore = Math.round(frame.posture_score * 100);
              const { time, face_detected, expression, gaze, head_movement, posture_stability } = frame;

              let summary = `🕒 ${time} — `;
              const details = [];

              // 💥 얼굴 + 표정 둘 다 안 보일 경우
              if (!face_detected && expression === "감정 없음") {
                summary += `얼굴 및 표정 인식 <strong>실패 ⚠️</strong>. `;
                if (postureScore >= 70) {
                  details.push("자세는 어느 정도 안정적으로 유지되었지만, 비언어적 요소의 분석이 불가능해 아쉬움이 남습니다.");
                } else {
                  details.push("자세가 불안정하고 얼굴/표정이 인식되지 않아 전달력이 매우 낮았을 수 있습니다.");
                }
                details.push("면접관 입장에서는 시선/표정/태도를 파악하기 어려웠을 수 있습니다.");
                return (
                  <li key={index}>
                    <div dangerouslySetInnerHTML={{ __html: summary + "→ " + details.join(" ") }} />
                  </li>
                );
              }

              // 🧠 얼굴 인식 실패만
              if (!face_detected) {
                summary += `얼굴 인식 <strong>실패 ⚠️</strong>. `;
                details.push("해당 구간에서는 얼굴이 인식되지 않아 시선, 표정, 표정 분석이 제한됩니다.");

                if (postureScore >= 80) {
                  details.push("자세는 안정적으로 유지되어 있으나, 비언어적 전달력은 부족했을 수 있습니다.");
                } else {
                  details.push("자세까지 흐트러져 비언어적 신뢰도에 크게 영향을 주었을 수 있습니다.");
                }
                return (
                  <li key={index}>
                    <div dangerouslySetInnerHTML={{ __html: summary + "→ " + details.join(" ") }} />
                  </li>
                );
              }

              // ✅ 얼굴 인식 성공 시 요약
              summary += `얼굴 인식 <strong>✅</strong>, 자세 <strong>${postureScore}점</strong>, 표정 <strong>${expression}</strong>, 시선 <strong>${gaze}</strong>.`;

              // 🪑 자세 점수
              if (postureScore >= 90) {
                details.push("매우 바른 자세를 유지하여 안정감 있고 자신감 있는 인상을 주었습니다.");
              } else if (postureScore >= 70) {
                details.push("자세는 대체로 안정적이었지만 약간의 흐트러짐이 관찰되었습니다.");
              } else if (postureScore >= 50) {
                details.push("앉은 자세가 자주 흔들려 긴장되거나 불안한 인상을 줄 수 있습니다.");
              } else {
                details.push("자세가 불안정하여 면접관에게 불성실한 태도로 비칠 수 있습니다.");
              }

              // 👀 시선 분석
              switch (gaze) {
                case "정면 응시":
                  details.push("시선을 잘 유지하여 집중력과 자신감을 드러냈습니다.");
                  break;
                case "시선 좌측":
                  details.push("시선이 자주 좌측으로 흐트러져 긴장하거나 산만해 보일 수 있습니다.");
                  break;
                case "시선 우측":
                  details.push("시선이 우측으로 흐트러져 전달력이 약하거나 불안정해 보일 수 있습니다.");
                  break;
                default:
                  details.push("시선 분석이 불가능해 면접관과의 교감 여부를 파악하기 어렵습니다.");
              }

              // 😀 표정 분석
              switch (expression) {
                case "웃는 표정":
                  details.push("밝은 표정으로 긍정적이고 열린 인상을 주었습니다.");
                  break;
                case "중립 표정":
                  details.push("중립적인 표정이 유지되어 무난하지만 다소 딱딱한 인상도 줄 수 있습니다.");
                  break;
                default:
                  details.push("표정이 인식되지 않거나 변화가 없어 감정 표현이 부족해 보일 수 있습니다.");
              }

              // 🧍 고개 움직임
              if (head_movement === "고개 움직임 많음") {
                details.push("고개를 자주 움직여 산만하거나 불안한 인상을 줄 수 있습니다.");
              } else {
                details.push("고개 움직임이 안정적으로 유지되었습니다.");
              }

              // 🔁 자세 흔들림
              if (posture_stability === "자세 흔들림 감지") {
                details.push("상체가 좌우로 자주 흔들려 불안정한 인상을 주었습니다.");
              }

              return (
                <li key={index}>
                  <div dangerouslySetInnerHTML={{ __html: summary + " → " + details.join(" ") }} />
                </li>
              );
            })}

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
