import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "../pages/MicCameraCheck.css";
import frame34 from "../image/Frame 34.svg";
import logoImg from "../image/mentorme_logo.png";

function MicCameraCheck() {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null);
  const [micLevel, setMicLevel] = useState(0);
  const [error, setError] = useState("");
  const type = location.state?.type;

  useEffect(() => {
    if (!type) {
      alert("면접 유형 정보가 없습니다. 처음 화면으로 돌아갑니다.");
      navigate('/');
      return;
    }

    let animationId;
    let stream;
    let audioCtx;

    async function initMedia() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const updateMic = () => {
          analyser.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          setMicLevel(average);
          animationId = requestAnimationFrame(updateMic);
        };

        updateMic();
      } catch (err) {
        console.error("media error", err);
        setError("마이크 또는 카메라 접근이 차단되었습니다.");
      }
    }

    initMedia();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (audioCtx) {
        audioCtx.close();
      }
    };
  }, [navigate, type]);

  const handleStart = () => {
    navigate('/recommend-interest', { state: { type } });
  };

  return (
    <>
      <div className="header-container">
        <div className="title-box">
          <div className="title-logo">
            <img src={logoImg} alt="로고" className="logo-img" />
          </div>
          <span className="title-text">마이크 카메라 확인</span>
        </div>
        <button className="exit-button" onClick={() => navigate('/interview-practice')}>나가기</button>
      </div>
      <hr className="hrline" />

      <div className="check-container">
        <div className="question-container-check">
          <img className="img" alt="Frame" src={frame34} />
          <div className="question-section">
            <span className="question-tag">모의 면접을 위해 마이크와 카메라를 확인 해주세요.</span>
            <p className="question-text">마이크와 카메라 모두 켜져 있어야 원활한 모의 면접과 AI 피드백 결과를 받아 보실 수 있습니다.</p>
            <p className="question-text">질문은 20초에 한 번씩 바뀝니다.</p>
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="video-wrapper-check">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="video-preview-check"
          />
        </div>

        <div className="mic-visualizer">
          <div
            className="mic-bar"
            style={{ width: `${Math.min(micLevel, 100)}%` }}
          />
        </div>

        <button className="next-btn" onClick={handleStart}>모의면접 시작하기</button>
      </div>
    </>
  );
}

export default MicCameraCheck;
