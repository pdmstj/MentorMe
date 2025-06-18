import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FeedbackDetailPage = () => {
  const { filename } = useParams(); // ex: 20250618_123456_interview.webm
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const trimmed = filename.replace(".webm", ""); // 확장자 제거
        const res = await fetch(`http://localhost:5002/feedback/${trimmed}`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("피드백 상세 조회 실패", err);
      }
    };

    fetchDetail();
  }, [filename]);

  if (!data) return <p>불러오는 중...</p>;

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h2>{data.user}님의 면접 상세 피드백</h2>

      <video
        src={`http://localhost:5002/uploads/${filename}`}
        controls
        style={{ width: "100%", marginBottom: "20px" }}
      />

      <h3>❓ 질문</h3>
      <p>{data.question}</p>

      <h3>📝 인식된 답변</h3>
      <p>{data.sttText}</p>

      <h3>🌟 강점</h3>
      <ul>
        {data.gptFeedback?.strengths?.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>

      <h3>🛠 보완점</h3>
      <ul>
        {data.gptFeedback?.improvements?.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>

      <h3>💡 면접 팁</h3>
      <ul>
        {data.gptFeedback?.tips?.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>

      <button
        onClick={() => navigate("/mypage")}
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          backgroundColor: "#6c63ff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        ← 돌아가기
      </button>
    </div>
  );
};

export default FeedbackDetailPage;
