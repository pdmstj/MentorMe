import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../pages/SelfInterviewPractice.css';
import frame34 from "../image/Frame 34.svg";
import logoImg from "../image/mentorme_logo.png";
import { fetchQuestionsByCategory } from '../services/questionService';

// 카테고리 한글 -> 영어 매핑 (서버 요청용)
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

const SelfInterviewPractice = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // URL에서 받은 관심분야(카테고리) 추출 후 영어 키로 변환, 기본값은 'design'
  const rawCategory = (location.state?.interest || "").trim();
  const category = categoryMap[rawCategory] ?? "design";

  // 비디오 엘리먼트, MediaRecorder 객체, 녹화 데이터 청크 저장용 Ref
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  // 상태 변수들
  const [mediaStream, setMediaStream] = useState(null);
  const [recording, setRecording] = useState(false);      // 녹화 중인지 여부
  const [recordedBlob, setRecordedBlob] = useState(null); // 녹화된 영상 Blob
  const [questions, setQuestions] = useState([]);          // 질문 리스트
  const [questionIndex, setQuestionIndex] = useState(0);   // 현재 질문 인덱스
  const [recordingTime, setRecordingTime] = useState(0);   // 녹화 시간(초)
  const [loading, setLoading] = useState(false);           // 분석 중 로딩 상태

  // 1. 카테고리별 질문 불러오기 (컴포넌트 최초 마운트 시)
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const qs = await fetchQuestionsByCategory(category);
        if (!qs || qs.length === 0) alert("해당 카테고리의 질문이 없습니다.");
        setQuestions(qs);
      } catch (err) {
        console.error("질문 로딩 실패:", err);
      }
    };
    loadQuestions();
  }, [category]);

  // 2. 질문 텍스트 음성출력 (questionIndex가 바뀔 때마다)
  useEffect(() => {
    if (loading) {
      // 분석 중엔 음성출력 취소
      window.speechSynthesis.cancel();
      return;
    }
    if (questions.length === 0) return;
    const questionText = questions[questionIndex];
    if (!questionText) return;

    window.speechSynthesis.cancel(); // 이전 음성 취소
    const utterance = new SpeechSynthesisUtterance(questionText);
    utterance.lang = 'ko-KR';
    window.speechSynthesis.speak(utterance); // 음성 출력 시작
  }, [questionIndex, questions, loading]);

  // 3. 질문 자동 전환 타이머 (30초마다 질문 바꿈)
  useEffect(() => {
    if (questions.length === 0) return;
    const timer = setInterval(() => {
      setQuestionIndex((prev) => (prev + 1) % questions.length);
    }, 30000);
    return () => clearInterval(timer);
  }, [questions]);

  // 4. 카메라 켜고 녹화 시작
  useEffect(() => {
    const startCameraAndRecording = async () => {
      try {
        // 웹캠 + 마이크 권한 요청 및 스트림 받기
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setMediaStream(stream);

        if (videoRef.current) videoRef.current.srcObject = stream; // 비디오 엘리먼트에 스트림 연결

        // MediaRecorder 생성 및 이벤트 핸들러 설정
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        chunksRef.current = [];

        // 녹화 데이터가 준비될 때마다 청크에 저장
        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunksRef.current.push(e.data);
        };

        // 녹화 중지 시 처리
        mediaRecorder.onstop = async () => {
          setLoading(true);
          const blob = new Blob(chunksRef.current, { type: 'video/webm' });
          setRecordedBlob(blob);
          const videoUrl = URL.createObjectURL(blob);
          const file = new File([blob], 'interview.webm', { type: 'video/webm' });
        
          const formData = new FormData();
          formData.append('file', file);
        
          try {
            // 1. 영상 업로드
            const saveRes = await fetch('http://localhost:5000/upload', {
              method: 'POST',
              body: formData
            });
        
            if (!saveRes.ok) throw new Error("영상 저장 실패");
            const saveResult = await saveRes.json();
            console.log("🎥 영상 저장 성공:", saveResult);
        
            const uploadedFilename = saveResult.path.split("/").pop(); // 파일명만 추출
        
            // 2. /analyze API 호출 (STT + 표정/자세)
            const analyzeRes = await fetch('http://localhost:5001/analyze', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ filename: uploadedFilename })
            });
        
            if (!analyzeRes.ok) throw new Error("분석 실패");
            const analyzeResult = await analyzeRes.json();
            console.log("🧠 분석 결과:", analyzeResult);
        
            // 3. 피드백 페이지로 이동
            const username = localStorage.getItem("username");
            navigate('/feedback', {
              state: {
                videoUrl,
                sttText: analyzeResult.text,
                expressionResult: { frames: analyzeResult.frames }, 
                type: 'self',
                user: username, 
                savedPath: saveResult.path
              }
            });
        
          } catch (error) {
            console.error("🎯 분석 중 에러:", error);
            alert("영상 저장 또는 분석 중 오류가 발생했습니다.");
          }
        
          stream.getTracks().forEach((track) => track.stop());
        };        

        mediaRecorder.start(); // 녹화 시작
        setRecording(true);    // 녹화 상태 true로 변경
      } catch (err) {
        console.error('웹캠 접근 오류:', err);
      }
    };

    startCameraAndRecording();
  }, []);

  // 5. 녹화 시간 타이머 (1초마다 1초씩 증가)
  useEffect(() => {
    if (!recording) return;
    const timer = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [recording]);

  // 녹화 중지하거나 녹화된 영상이 있을 때 피드백 페이지로 이동하는 함수
  const goToFeedback = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      setLoading(true);
      mediaRecorderRef.current.stop();  // 녹화 중지 (onstop 이벤트 발생)
      setRecording(false);
    } else if (recordedBlob) {
      const videoUrl = URL.createObjectURL(recordedBlob);
      navigate('/feedback', { state: { videoUrl, sttText: "", type: 'self' } });
    } else {
      alert('녹화된 영상이 없습니다.');
    }
  };

  // 초를 mm:ss 형태 문자열로 변환하는 함수
  const formatTime = (s) => {
    const m = String(Math.floor(s / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${m}:${sec}`;
  };

  return (
    <>
      {/* 분석 중일 때 띄우는 로딩 화면 */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner" />
          <p>🌀 분석 중입니다. 잠시만 기다려주세요...</p>
          분석 시간이 많이 지연될 수도 있습니다 !
        </div>
      )}

      {/* 분석 중이 아닐 때 메인 UI */}
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
          <div className="container">
            <div className="question-container">
              <img className="img" alt="Frame" src={frame34} />
              <div className="question-section">
                <span className="question-tag">🧠 질문</span>
                <p className="question-text">
                  {questions.length > 0 ? questions[questionIndex] : "질문을 불러오고 있습니다..."}
                </p>
              </div>
            </div>

            {/* 웹캠 영상 보여주는 비디오 태그 */}
            <video ref={videoRef} autoPlay muted playsInline className="user-webcam" />

            <div className="control-bar">
              <span className="recording-text">녹화중 {formatTime(recordingTime)}</span>
              <button className="pause-button" disabled>일시정지</button>
              <div className="waveform">
                {/* 단순 시각적 효과 */}
                <div className="bar" /><div className="bar" /><div className="bar" /><div className="bar" /><div className="bar" />
              </div>
              <button className="feedback-button" onClick={goToFeedback}>피드백 보러가기</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SelfInterviewPractice;