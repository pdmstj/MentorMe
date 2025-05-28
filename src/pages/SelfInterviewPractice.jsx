import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/SelfInterviewPractice.css';
import frame34 from "../image/Frame 34.svg";

const questions = [
  { tag: '문제해결 역량', text: '과제나 프로젝트를 수행하는 과정에서 문제가 발생하여 해결했던 경험에 대해 이야기해주세요.' },
  { tag: '협업 경험', text: '팀 프로젝트에서 갈등이 있었던 경험과 어떻게 해결했는지 말씀해주세요.' },
  { tag: '성장 경험', text: '본인이 성장했다고 느꼈던 경험에 대해 이야기해주세요.' },
  { tag: '지원 동기', text: '해당 직무나 회사에 지원하게 된 계기를 말씀해주세요.' }
];

const SelfInterviewPractice = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [mediaStream, setMediaStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [time, setTime] = useState(0);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const startCameraAndRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setMediaStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunksRef.current.push(e.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'video/webm' });
          setRecordedBlob(blob);
          const videoUrl = URL.createObjectURL(blob);
          navigate('/feedback', { state: { videoUrl } });

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

  useEffect(() => {
    if (!recording) return;
    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [recording]);

  const formatTime = (s) => {
    const m = String(Math.floor(s / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${m}:${sec}`;
  };

  const goToFeedback = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop(); // 자동으로 onstop에서 navigate 실행됨
      setRecording(false);
    } else if (recordedBlob) {
      const videoUrl = URL.createObjectURL(recordedBlob);
      navigate('/feedback', { state: { videoUrl } });
    } else {
      alert('녹화된 영상이 없습니다.');
    }
  };

  return (
    <>
      <div className="header-container">
        <div className="title-box">
          <div className="gray-box"></div>
          <span className="title-text">대화형 실전 면접</span>
        </div>
        <button className="exit-button" onClick={() => navigate('/')}>나가기</button>
      </div>
      <hr className="hrline" />
      <div className="container">
        <div className="question-container">
          <img className="img" alt="Frame" src={frame34} />
          <div className="question-section">
            <div className="dropdown-header" onClick={() => setShowDropdown(!showDropdown)}>
              {questions[selectedQuestionIndex].tag}
              <span className="arrow">{showDropdown ? '▲' : '▼'}</span>
            </div>
            {showDropdown && (
              <ul className="dropdown-list">
                {questions.map((q, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      setSelectedQuestionIndex(idx);
                      setShowDropdown(false);
                    }}
                  >
                    {q.tag}
                  </li>
                ))}
              </ul>
            )}
            <div className="question-text">{questions[selectedQuestionIndex].text}</div>
          </div>
        </div>

        <video ref={videoRef} autoPlay muted playsInline className="user-webcam" />
        <div className="control-bar">
          <span className="recording-text">녹화중 {formatTime(time)}</span>
          <button className="pause-button" disabled>일시정지</button>
          <div className="waveform">
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
          </div>
          <button className="feedback-button" onClick={goToFeedback}>피드백 보러가기</button>
        </div>
      </div>
    </>
  );
};

export default SelfInterviewPractice;
