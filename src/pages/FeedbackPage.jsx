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
  const expressionResult = location.state?.expressionResult;  // ✅ 추가
  const expressionFrames = expressionResult?.frames || [];

  const feedbackSummary = sttText
  ? type === 'self'
      ? {
          strengths: [
            "자기주도적 학습 능력: 문제 상황을 인식하고 능동적으로 해결하려는 모습이 돋보입니다.",
            "책임감: 과제나 프로젝트에 대한 지속적인 관심과 완수 의지가 있습니다.",
            "명확한 목표 설정: 본인의 진로 방향과 하고 싶은 일에 대한 명확한 의지가 보입니다.",
            "성실한 태도: 면접 전반에 걸쳐 신중하고 진지한 태도가 인상 깊었습니다.",
            "꾸준한 자기계발 노력: 개인적으로 역량을 키우기 위한 다양한 시도를 하고 있습니다.",
            "자기 표현력: 자신의 강점과 경험을 진솔하게 풀어내는 능력이 뛰어났습니다."
          ],
          improvements: [
            "구체적인 사례 제시 부족: 경험을 이야기할 때 구체적인 상황과 행동 설명이 부족했습니다.",
            "표현력의 다양성 부족: 말투나 어휘 선택이 반복되는 경향이 있습니다.",
            "감정 표현 미흡: 이야기하는 동안 표정이 일정하게 유지되어 감정 전달이 다소 부족해 보였습니다.",
            "발음 및 억양: 일부 단어가 부정확하게 들려 전달력이 떨어질 수 있습니다.",
            "속도 조절: 말의 속도가 너무 일정하거나 빠른 경향이 있습니다.",
            "눈맞춤 부족: 시선 처리가 부족해 자신감이 떨어져 보일 수 있습니다."
          ],
          tips: [
            "STAR 기법(상황, 과제, 행동, 결과)을 활용해 경험을 더 구조적으로 전달해 보세요.",
            "면접 영상을 촬영한 후 직접 보면서 개선 포인트를 체크해 보세요.",
            "답변마다 감정 표현(표정, 억양)을 넣어 생동감을 더해보세요.",
            "말하기 연습 시 질문에 대한 핵심 키워드부터 떠올리는 습관을 들이세요.",
            "예상 질문 리스트를 만들어보고, 친구나 가족과 모의면접을 해보세요.",
            "중간중간 잠깐 멈추고 생각하는 여유도 연습해보세요."
          ]
        }
      : {
          strengths: [
            "논리적 사고력: 질문의 요지를 빠르게 파악하고 체계적으로 답변을 구성했습니다.",
            "직무 이해도: 지원 직무에 대한 명확한 이해와 관심이 드러났습니다.",
            "자신감 있는 태도: 말할 때 망설임이 적고 또렷하게 의견을 표현했습니다.",
            "문제 해결 능력: 상황에 대한 대처 방식에서 분석력과 해결 의지가 느껴졌습니다.",
            "협업 경험 강조: 타인과의 협력 경험을 통해 팀워크를 잘 드러냈습니다.",
            "밝고 긍정적인 인상: 전체적으로 친근하고 긍정적인 인상을 주었습니다."
          ],
          improvements: [
            "경험 구체성 부족: 실무 경험을 설명할 때 구체적인 수치나 역할이 부족했습니다.",
            "직무 연관성 부족: 일부 사례가 지원 직무와의 관련성이 약했습니다.",
            "지나치게 형식적인 말투: 자연스럽게 전달하는 연습이 필요합니다.",
            "질문에 대한 선명한 결론 부족: 핵심 메시지가 모호한 경우가 있습니다.",
            "면접 중간의 긴장감: 말이 막히거나 시선이 흔들리는 경우가 보였습니다.",
            "피드백 수용 태도 미흡: 과거 실수에 대한 개선 노력을 더 강조하면 좋습니다."
          ],
          tips: [
            "답변은 '결론 → 근거 → 사례' 순으로 구성하면 전달력이 높아집니다.",
            "실무 경험은 수치, 프로젝트 명, 기여도 등을 포함해 설명하세요.",
            "직무와 관련된 역량 키워드를 미리 정리해두면 좋습니다.",
            "회사에 대한 관심도 (미션, 제품 등)를 자연스럽게 녹여보세요.",
            "면접관이 듣기 쉬운 속도와 발음으로 또박또박 말하세요.",
            "질문 의도를 재확인하며 답변하면 실수가 줄어듭니다."
          ]
        }
    : null;

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

      if (!uploadRes.ok) throw new Error("업로드 실패");

      const result = await uploadRes.json();
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

          {/* 🎥 영상 */}
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

          {/* 📋 피드백 박스 */}
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
                  const time = frame.time;
                  const detected = frame.face_detected;
                  const expression = frame.expression;
                  const gaze = frame.gaze;

                  return (
                    <li key={index}>
                      🕒 {time} —{" "}
                      {detected ? (
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
