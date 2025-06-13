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

import { UserProvider } from './contexts/UserContext';

import RecommendModal from './components/Recommend/RecommendModal';
import RecommendInterestPage from './pages/RecommendInterestPage';

import MypageMain from './components/Mypage/MypageMain';
import Mypage from './components/Mypage/Mypage';

import Recommend from './components/Recommend/Recommend';

import LoginPage from './components/Login_SignUp/LoginPage';
import SignupPage from './components/Login_SignUp/SignupPage';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<InterviewMain />} />
          <Route path="/mic-camera-check" element={<MicCameraCheck />} />
          <Route path="/interview-practice" element={<InterviewPracticePage />} />
          <Route path="/conversation-practice" element={<ConversationPracticePage />} />
          <Route path="/self-practice" element={<SelfInterviewPracticePage />} />
          <Route path="/feedback" element={<FeedbackPage />} />

          {/* 로그인 / 회원가입 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* 추천 모달, 관심사 선택 */}
          <Route path="/recommend-modal" element={<RecommendModal />} />
          <Route path="/recommend-interest" element={<RecommendInterestPage />} />

          {/* 마이페이지 */}
          <Route path="/mypage-main" element={<MypageMain />} />
          <Route path="/mypage" element={<Mypage />} />

          {/* 회사 추천 */}
          <Route path="/recommend" element={<Recommend />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
