import React from "react";
import "./header.css";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="main-header">
      <Link to="/" className="logo" />
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
