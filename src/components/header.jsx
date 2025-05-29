import React from "react";
import "./header.css";
import { Link } from 'react-router-dom';
import logoImg from "../image/mentorme_logo.png";

function Header() {
  return (
    <header className="main-header">
      <Link to="/" className="logo">
        <img src={logoImg} alt="로고" className="logo-img" />
      </Link>
      <nav className="nav-menu">
        <a href='/interview-practice'>면접 연습</a>
        <a href="#">내 결과확인</a>
        <div className="user">
          <span className="icon">👤</span>
          <span>김미림</span>
          <span className="arrow">▾</span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
