import React, { useContext } from "react";
import "./MyPageHeader.css";
import { Link, useNavigate } from 'react-router-dom';
import logoImg from "../image/mentorme_logo.png";
import { UserContext } from "../contexts/UserContext";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="mypage-header">
      <Link to="/" className="logo">
        <img src={logoImg} alt="로고" className="logo-img" />
      </Link>
    </header>
  );
}

export default Header;
