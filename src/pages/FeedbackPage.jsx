import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../pages/FeedbackPage.css';
import logoImg from "../image/mentorme_logo.png";
import feedbackImg from "../image/feedback.png";

const FeedbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const videoUrl = location.state?.videoUrl;
  const sttText = location.state?.sttText;
  const type = location.state?.type;

  const feedbackSummary = sttText
    ? type === 'self'
      ? {
          strengths: [
            "자기주도적 학습 능력: 스스로 문제를 해결하려는 노력이 돋보였습니다.",
            "책임감: 과제와 목표를 스스로 설정하고 성실하게 수행했습니다."
          ],
          improvements: [
            "구체적인 사례 추가: 경험을 뒷받침하는 사례가 조금 더 필요합니다.",
            "답변의 간결성: 핵심을 빠르게 전달하는 연습이 필요합니다."
          ],
          tips: [
            "혼자서 연습할 때도 시간 제한을 두고 연습하세요.",
            "녹화된 답변을 다시 보며 스스로 피드백하는 습관을 가져보세요."
          ]
        }
      : {
          strengths: [
            "명확한 커뮤니케이션 능력: 질문의 요점을 정확히 이해하고 답변했습니다.",
            "논리적인 사고: 체계적이고 구조적인 답변을 구성했습니다.",
            "밝은 태도: 면접 내내 자신감 있는 태도를 유지했습니다."
          ],
          improvements: [
            "답변 시간 관리: 일부 답변이 길어지는 경향이 있습니다.",
            "구체적인 사례 추가: 경험을 뒷받침하는 사례가 더 필요합니다."
          ],
          tips: [
            "STAR 기법(상황, 과제, 행동, 결과)을 활용해 경험을 더 구체적으로 설명하세요.",
            "면접 예상 질문 리스트를 작성하고 반복 연습해보세요."
          ]
        }
    : null;

  // 🔥 저장 버튼 클릭 시 서버에 업로드 요청
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

      const uploadRes = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData
      });

      if (!uploadRes.ok) {
        throw new Error("업로드 실패");
      }

      const result = await uploadRes.json();
      alert("저장 완료! ✅");

      // 필요시 마이페이지로 이동 등 추가 처리 가능
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
          {/* 영상 */}
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

          {/* 피드백 */}
          <div className="feedback-box">
            <h3 className="box-title">AI 분석 기반 피드백</h3>

            <div className="feedback-item">
              <h4 className="feedback-heading">📝 인식된 답변</h4>
              <p className="feedback-text">
                {sttText ? sttText : "분석된 텍스트가 없습니다. 다시 시도해주세요."}
              </p>
              <hr className="feedback-hr" />
            </div>

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

                <div className="feedback-item">
                  <h4 className="feedback-heading">🛠️ 보완점</h4>
                  <ul className="feedback-text">
                    {feedbackSummary.improvements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <hr className="feedback-hr" />
                </div>

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
        <button className="btn" onClick={handleSave}>저장</button>
        <button className="btn">삭제</button>
      </div>
    </>
  );
};

export default FeedbackPage;
