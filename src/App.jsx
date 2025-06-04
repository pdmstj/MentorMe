import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InterviewPracticePage from "./pages/InterviewPracticePage";
import ConversationPracticePage from './pages/ConversationPracticePage';
import SelfInterviewPracticePage from './pages/SelfInterviewPractice';
import FeedbackPage from './pages/FeedbackPage';
import InterviewMain from './pages/InterviewMain';
import MicCameraCheck from './pages/MicCameraCheck';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// 🆕 Context 추가
import { UserProvider } from './contexts/UserContext'; // <-- 추가

// 🆕 모달, 직무 선택 페이지 import
import RecommendModal from './components/Recommend/RecommendModal';
import RecommendInterestPage from './pages/RecommendInterestPage'; 

// 🆕 마이페이지 메인 import
import MypageMain from './components/Mypage/MypageMain'; 
// 🆕 마이페이지 상세 (입력 폼) import
import Mypage from './components/Mypage/Mypage'; 

// 🆕 회사 추천 페이지 import
import Recommend from './components/Recommend/Recommend'; 

// 🆕 로그인 / 회원가입 import
import LoginPage from './components/Login_SignUp/LoginPage';
import SignupPage from './components/Login_SignUp/SignupPage';

const App = () => {
  return (
    <UserProvider> {/* 🆕 전체를 감싸줌 */}
      <Router>
        <Routes>
          <Route path="/" element={<InterviewMain />} />
          <Route path="/mic-camera-check" element={<MicCameraCheck />} />
          <Route path="/interview-practice" element={<InterviewPracticePage />} />
          <Route path="/conversation-practice" element={<ConversationPracticePage />} />
          <Route path="/self-practice" element={<SelfInterviewPracticePage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          
          {/* 🆕 로그인/회원가입 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* 🆕 추천 모달 페이지 */}
          <Route path="/recommend-modal" element={<RecommendModal />} />
          <Route path="/recommend-interest" element={<RecommendInterestPage />} />

          {/* 🆕 마이페이지 */}
          <Route path="/mypage-main" element={<MypageMain />} />
          <Route path="/mypage" element={<Mypage />} />

          {/* 🆕 회사 추천 */}
          <Route path="/recommend" element={<Recommend />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
