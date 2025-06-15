import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../pages/ConversationPracticePage.css';
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

  // 질문 TTS 읽기
  useEffect(() => {
    if (questions.length === 0) return;
    if (loading) {
      window.speechSynthesis.cancel();  // 분석 중이면 읽기 중단
      return;
    }

    const speakQuestion = (text) => {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      window.speechSynthesis.speak(utterance);
    };

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
  }, [questions, questionIndex, loading]);

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
          const file = new File([blob], 'interview.webm', { type: 'video/webm' });
          const formData = new FormData();
          formData.append('file', file);

          try {
            // 1. 업로드
            const saveRes = await fetch('http://localhost:5000/upload', {
              method: 'POST',
              body: formData,
            });
        
            if (!saveRes.ok) throw new Error("영상 저장 실패");
            const saveResult = await saveRes.json();
            const uploadedFilename = saveResult.path.split("/").pop();
        
            // 2. 분석 요청
            const analyzeRes = await fetch('http://localhost:5001/analyze', {
              method: 'POST',
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ filename: uploadedFilename }),
            });
        
            if (!analyzeRes.ok) throw new Error("분석 요청 실패");
            const analyzeResult = await analyzeRes.json();
        
            // 3. 이동
            const username = localStorage.getItem("username");
            navigate('/feedback', {
              state: {
                videoUrl,
                sttText: analyzeResult.text,
                expressionResult: { frames: analyzeResult.frames }, 
                type: 'self',
                user: username, 
              },
            });
        
          } catch (err) {
            console.error("분석 오류:", err);
            alert("분석 중 오류 발생 ❌");
            setLoading(false);
          }
        
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start();
        setRecording(true);
      } catch (err) {
        console.error('웹캠 접근 오류:', err);
        alert('웹캠 접근 권한이 필요합니다.');
      }
    };

    startCameraAndRecording();
  }, []);

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