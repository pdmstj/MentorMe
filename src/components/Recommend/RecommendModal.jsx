import React from "react";
import { useNavigate } from "react-router-dom";
import "./RecommendModal.css";

const RecommendModal = () => {
  const navigate = useNavigate();

  const handleYes = () => {
    navigate("/recommend-interest");
  };

  const handleNo = () => {
    navigate("/main"); // 그냥 메인페이지로
  };

  return (
    <div className="recommend-modal-container">
      <h2 className="recommend-modal-title">기업 추천을 받아보시겠습니까?</h2>
      <div className="recommend-modal-buttons">
        <button onClick={handleYes}>예</button>
        <button onClick={handleNo}>아니요</button>
      </div>
    </div>
  );
};

export default RecommendModal;
