import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InterviewPracticePage from "./pages/InterviewPracticePage";
import ConversationPracticePage from './pages/ConversationPracticePage';
import SelfInterviewPracticePage from './pages/SelfInterviewPractice'
import FeedbackPage from './pages/FeedbackPage';
import InterviewMain from './pages/InterviewMain';
import MicCameraCheck from './pages/MicCameraCheck';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InterviewMain />} />
        <Route path="/mic-camera-check" element={<MicCameraCheck />} />
        <Route path="/interview-practice" element={<InterviewPracticePage />} />
        <Route path="/conversation-practice" element={<ConversationPracticePage />} />
        <Route path="/self-practice" element={<SelfInterviewPracticePage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </Router>
  );
};

export default App;
