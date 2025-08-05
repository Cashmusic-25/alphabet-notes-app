import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import MainMenu from './components/MainMenu';
import LearnMode from './components/LearnMode';
import StaffMode from './components/StaffMode';

function App() {
  const noteMapping = {
    'A': '라 (La)',
    'B': '시 (Si)',
    'C': '도 (Do)',
    'D': '레 (Re)',
    'E': '미 (Mi)',
    'F': '파 (Fa)',
    'G': '솔 (Sol)'
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center text-gray-800">음악 학습 앱</h1>
          
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/alphabet-quiz" element={<LearnMode noteMapping={noteMapping} />} />
            <Route path="/staff-quiz" element={<StaffMode />} />
          </Routes>
          
          <NavigationBar />
        </div>
      </div>
    </Router>
  );
}

// 네비게이션 바 컴포넌트
function NavigationBar() {
  const location = useLocation();
  
  // 메인 페이지가 아닐 때만 네비게이션 바 표시
  if (location.pathname === '/') {
    return null;
  }
  
  return (
    <div className="mt-6 sm:mt-8 mb-4 sm:mb-6 text-center sticky bottom-0 bg-gray-100 pt-4 pb-safe">
      <Link 
        to="/"
        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-sm sm:text-base transition-colors shadow-lg w-full max-w-xs sm:max-w-sm lg:max-w-md inline-block"
      >
        메인 메뉴로
      </Link>
    </div>
  );
}

export default App;