import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './MypageMain.css';
import { UserContext } from '../../contexts/UserContext';

const MypageMain = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // ✅ 특정 섹션으로 이동
  const handleSectionClick = (sectionId: string) => {
    navigate(`/mypage#${sectionId}`);
  };

  // + 버튼 클릭
  const handlePlusClick = () => {
    navigate('/mypage');
  };

  return (
    <div className="mypage-container">
      <div className="mypage-menu">
        <div className="menu-item active">프로필</div>
        <div className="menu-item">모의면접 기록</div>
        <div className="menu-item">설정</div>
      </div>

      <div className="mypage-content">
        <div className="mypage-sidebar">
          <div className="sidebar-title">마이페이지</div>
          <a href="#" className="recommend-msg">기업 추천을 받을 수 있어요.</a>
          <div className="sidebar-buttons">
            {/* ✅ 각각 이동할 섹션 ID 설정 */}
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
              <div className="card">2024.08.19</div>
              <div className="card">2025.01.07</div>
              <div className="card">2025.05.17</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypageMain;
