import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './MypageMain.css';
import { UserContext } from '../../contexts/UserContext';
import logoImg from '../../image/mentorme_logo.png';
import MypageTabs from '../../components/MypageTabs';

const MypageMain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [videos, setVideos] = useState<string[]>([]);

  const handleSectionClick = (sectionId: string) => {
    navigate(`/mypage#${sectionId}`);
  };

  const handlePlusClick = () => {
    navigate('/mypage');
  };

  useEffect(() => {
    fetch('http://localhost:5000/videos')
      .then(res => res.json())
      .then(data => {
        if (data.videos) {
          setVideos(data.videos);
        }
      })
      .catch(err => {
        console.error('영상 목록 불러오기 실패:', err);
      });
  }, []);

  return (
    <div className="mypage-container">
      <div className="mypage-header">
        <Link to="/" className="logo">
          <img src={logoImg} alt="로고" className="logo-img" />
        </Link>
      </div>

    <MypageTabs /> {/* ✅ 로고 아래, 사이드바 위쪽으로 탭 이동 */}

      <div className="mypage-content">
        <div className="mypage-sidebar">
          
          <div className="sidebar-title">마이페이지</div>
          <button className="recommend-msg" onClick={() => alert('추천 기능 준비 중!')}>
            기업 추천을 받을 수 있어요.
          </button>
          <div className="sidebar-buttons">
            <button onClick={() => handleSectionClick('basic-info')}>기본정보 <span className="required">*</span></button>
            <button onClick={() => handleSectionClick('preference-info')}>선호정보</button>
            <button onClick={() => handleSectionClick('education-info')}>학력</button>
            <button onClick={() => handleSectionClick('career-info')}>경력</button>
            <button onClick={() => handleSectionClick('project-info')}>프로젝트</button>
            <button onClick={() => handleSectionClick('skill-info')}>지식, 기술</button>
            <button onClick={() => handleSectionClick('experience-info')}>경험</button>
            <button onClick={() => handleSectionClick('award-info')}>수상내역</button>
          </div>
        </div>

        <div className="mypage-main">
          <div className="recommend-section">
            <span>관심분야 선택하고 기업 추천을 받아보세요.</span>
            <button className="recommend-detail">상세보기</button>
            <div className="toggle-container">
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
              <span className="toggle-text">제안 받기</span>
            </div>
          </div>

          <div className="profile-section">
            <div className="profile-info">
              <div className="profile-img"></div>
              <div className="profile-text">
                <div><strong>{user ? user.name : "로그인 필요"}</strong> <span className="required">*</span></div>
                <div>
                  {user ? (
                    <>
                      {user.birth} | {user.phone} | {user.email}
                    </>
                  ) : (
                    <>로그인된 사용자 정보 없음</>
                  )}
                </div>
              </div>
            </div>
            <button className="plus-btn" onClick={handlePlusClick}>＋</button>
          </div>

          <div className="interview-section">
            <div className="interview-title">
              <strong>최근 면접 보기</strong>
              <button className="plus-btn">＋</button>
            </div>
            <div className="interview-cards">
              {videos.length > 0 ? (
                videos.map((videoUrl, idx) => (
                  <video
                    key={idx}
                    src={videoUrl}
                    controls
                    width="320"
                    height="180"
                    style={{ marginRight: 10, marginBottom: 10, borderRadius: 8 }}
                  />
                ))
              ) : (
                <div>영상이 없습니다.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypageMain;