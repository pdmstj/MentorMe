import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../pages/ConversationPracticePage.css';  // 두번째 스타일 css
import frame34 from "../image/Frame 34.svg";
import ai_men from "../image/aimento.png";
import logoImg from "../image/mentorme_logo.png";
import { fetchQuestionsByCategory } from '../services/questionService';

const categoryMap = {
  "기획": "management",
  "경영": "management",
  "마케팅": "management",
  "기술": "develop",
  "개발": "develop",
  "디자인": "design",
  "미디어": "design",
  "콘텐츠": "design",
  "건너뛰기": "tenacity"
};

const SelfInterviewPracticeStyled = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const rawCategory = (location.state?.interest || "").trim();
  const category = categoryMap[rawCategory] ?? "design";

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [mediaStream, setMediaStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const [loading, setLoading] = useState(false);

  // 질문 불러오기
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const qs = await fetchQuestionsByCategory(category);
        if (!qs || qs.length === 0) {
          alert("해당 카테고리의 질문이 없습니다.");
        }
        setQuestions(qs);
      } catch (err) {
        console.error("질문 로딩 실패:", err);
      }
    };
    loadQuestions();
  }, [category]);

  // 30초마다 질문 변경 및 TTS 실행
  useEffect(() => {
    if (questions.length === 0) return;

    // 질문을 음성으로 읽어주는 함수
    const speakQuestion = (text) => {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();  // 기존 읽기 취소

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR'; // 한국어 설정
      window.speechSynthesis.speak(utterance);
    };

    // 첫 질문 읽기
    speakQuestion(questions[questionIndex]);

    const timer = setInterval(() => {
      setQuestionIndex((prev) => {
        const nextIndex = (prev + 1) % questions.length;
        speakQuestion(questions[nextIndex]);
        return nextIndex;
      });
    }, 30000);

    return () => {
      clearInterval(timer);
      window.speechSynthesis.cancel();
    };
  }, [questions]);

  // 웹캠 및 녹화 시작
  useEffect(() => {
    const startCameraAndRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setMediaStream(stream);
        if (videoRef.current) videoRef.current.srcObject = stream;

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        chunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunksRef.current.push(e.data);
        };

        mediaRecorder.onstop = async () => {
          setLoading(true);

          const blob = new Blob(chunksRef.current, { type: 'video/webm' });
          setRecordedBlob(blob);
          const videoUrl = URL.createObjectURL(blob);

          // 오디오 추출 대신 그대로 Blob 전송 (원래 로직 유지)
          const audioBlob = blob;

          const file = new File([audioBlob], 'audio.webm', { type: 'audio/webm' });
          const formData = new FormData();
          formData.append('file', file);

          try {
            const response = await fetch('http://localhost:8000/stt/', {
              method: 'POST',
              body: formData,
            });

            const data = await response.json();
            console.log("STT 결과: ", data.text);

            navigate('/feedback', {
              state: {
                videoUrl,
                sttText: data.text,
                type: 'self',
              }
            });
          } catch (error) {
            console.error('STT 서버 에러:', error);
            alert('음성 인식 중 오류가 발생했습니다.');
            setLoading(false);
          }

          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start();
        setRecording(true);
      } catch (err) {
        console.error('웹캠 접근 오류:', err);
      }
    };

    startCameraAndRecording();
  }, []);

  // 녹화 시간 타이머
  useEffect(() => {
    if (!recording) return;
    const timer = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [recording]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleFeedbackClick = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      setLoading(true);
      mediaRecorderRef.current.stop();
      setRecording(false);
    } else if (recordedBlob) {
      const videoUrl = URL.createObjectURL(recordedBlob);
      navigate('/feedback', {
        state: { videoUrl, sttText: "", type: 'self' }
      });
    } else {
      alert('녹화된 영상이 없습니다.');
    }
  };

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner" />
          <p>🌀 분석 중입니다. 잠시만 기다려주세요...</p>
          분석 시간이 많이 지연될 수도 있습니다 !
        </div>
      )}

      {!loading && (
        <>
          <div className="header-container">
            <div className="title-box">
              <div className="title-logo">
                <img src={logoImg} alt="로고" className="logo-img" />
              </div>
              <span className="title-text">셀프 실전 면접</span>
            </div>
            <button className="exit-button" onClick={() => navigate('/')}>나가기</button>
          </div>
          <hr className="hrline" />
          <div className="interview-container">
            <div className="question-container">
              <img className="img" alt="Frame" src={frame34} />
              <div className="question-section">
                <span className="question-tag">🧠 질문</span>
                <p className="question-text">
                  {questions.length > 0 ? questions[questionIndex] : "질문을 불러오고 있습니다..."}
                </p>
              </div>
            </div>

            <div className="interview-video-section">
              <div className="ai-interviewer">
                <p>AI 면접관 화면</p>
                <img src={ai_men} alt="AI 면접관" className="face-image" />
              </div>

              <div className="user-camera">
                <p>나의 화면</p>
                <video ref={videoRef} autoPlay muted playsInline className="video-preview" />

                {recording && (
                  <div className="recording-bar">
                    <div className="recording-indicator">🔴 녹화중 {formatTime(recordingTime)}</div>
                    <div className="waveform">
                      <div className="bar"></div>
                      <div className="bar"></div>
                      <div className="bar"></div>
                      <div className="bar"></div>
                      <div className="bar"></div>
                    </div>
                    <button className="feedback-button" onClick={handleFeedbackClick}>피드백 보러가기</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SelfInterviewPracticeStyled;
