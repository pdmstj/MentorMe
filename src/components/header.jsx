import React, { useContext } from "react";
import "./header.css";
import { Link, useNavigate } from 'react-router-dom';
import logoImg from "../image/mentorme_logo.png";
import { UserContext } from "../contexts/UserContext";

function Header() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert("로그아웃 되었습니다.");
    navigate('/login');
  };

  return (
    <header className="main-header">
      <Link to="/" className="logo">
        <img src={logoImg} alt="로고" className="logo-img" />
      </Link>

      <nav className="nav-menu">
        <Link to="/interview-practice">면접 연습</Link>
        <Link to="/record">내 결과확인</Link>

        {user ? (
          <div className="user-menu">
            {/* ✅ 이름 클릭하면 마이페이지 이동 */}
            <Link to="/mypage-main" className="user">
              <span className="icon">👤</span>
              <span>{user.name}</span>
              <span className="arrow">▾</span>
            </Link>
            {/* ✅ 로그아웃 버튼 */}
            <button onClick={handleLogout} className="logout-btn">로그아웃</button>
          </div>
        ) : (
          <Link to="/login" className="user">
            <span className="icon">👤</span>
            <span>로그인</span>
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
