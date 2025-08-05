import React from 'react';
import { Link } from 'react-router-dom';

const MainMenu = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 rounded-lg">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 lg:mb-12 text-center">학습 모드 선택</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
        <Link 
          to="/alphabet-quiz"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 rounded-lg text-base sm:text-lg lg:text-xl transition-all duration-200 transform hover:scale-105 active:scale-95 block text-center"
        >
          🎵 알파벳과 계이름 연결하기<br/>
          <span className="text-sm sm:text-base lg:text-lg block mt-2 opacity-90">학습, 퀴즈, 랜덤 연습 포함</span>
        </Link>
        
        <Link 
          to="/staff-quiz"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 rounded-lg text-base sm:text-lg lg:text-xl transition-all duration-200 transform hover:scale-105 active:scale-95 block text-center"
        >
          🎼 높낮이 퀴즈<br/>
          <span className="text-sm sm:text-base lg:text-lg block mt-2 opacity-90">오선지에서 높은음 찾기</span>
        </Link>
      </div>
    </div>
  );
};

export default MainMenu; 