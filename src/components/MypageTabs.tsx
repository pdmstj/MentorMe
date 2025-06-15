import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MypageTabs.css'; // ← 외부 CSS 파일 import

const MypageTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="mypage-tabs">
      <div
        className={`mypage-tab-item ${location.pathname === '/mypage-main' ? 'active' : ''}`}
        onClick={() => navigate('/mypage-main')}
      >
        프로필
      </div>
      <div
        className={`mypage-tab-item ${location.pathname === '/record' ? 'active' : ''}`}
        onClick={() => navigate('/record')}
      >
        모의면접 기록
      </div>
      <div
        className={`mypage-tab-item ${location.pathname === '/setting' ? 'active' : ''}`}
        onClick={() => navigate('/setting')}
      >
        설정
      </div>
    </div>
  );
};

export default MypageTabs;
