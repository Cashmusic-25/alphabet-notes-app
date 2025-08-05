import React, { useState, useEffect } from 'react';

const LearnMode = ({ noteMapping }) => {
  const [currentTab, setCurrentTab] = useState('learn'); // 'learn', 'quiz'
  const [currentLetter, setCurrentLetter] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showNote, setShowNote] = useState(false);
  const [timeInterval, setTimeInterval] = useState(10);
  const [timer, setTimer] = useState(10);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isSettingTime, setIsSettingTime] = useState(false);
  
  const letters = Object.keys(noteMapping);
  
  // Generate a random letter
  const getRandomLetter = () => {
    const randomIndex = Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
  };
  
  const newQuestion = () => {
    setCurrentLetter(getRandomLetter());
    setUserAnswer('');
    setFeedback('');
    setShowNote(false);
  };
  
  const handleSubmit = () => {
    setTotalQuestions(totalQuestions + 1);
    const correctAnswer = noteMapping[currentLetter];
    
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase() || 
        userAnswer.toLowerCase() === correctAnswer.split(' ')[0].toLowerCase()) {
      setFeedback('정답입니다!');
      setScore(score + 1);
      setTimeout(newQuestion, 1500);
    } else {
      setFeedback(`틀렸습니다. 정답은 ${correctAnswer} 입니다.`);
      setTimeout(newQuestion, 2000);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };
  
  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };
  
  const toggleNote = () => {
    setShowNote(!showNote);
  };
  
  const toggleSettingTime = () => {
    setIsSettingTime(!isSettingTime);
  };
  
  const handleTimeChange = (seconds) => {
    const newTime = Math.max(1, Math.min(60, seconds));
    setTimeInterval(newTime);
    setTimer(newTime);
    setIsSettingTime(false);
  };
  
  // Timer effect for quiz mode
  useEffect(() => {
    if (currentTab === 'quiz') {
      newQuestion();
    }
    
    let interval;
    if (currentTab === 'quiz' && isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            setCurrentLetter(getRandomLetter());
            setShowNote(false);
            setUserAnswer('');
            setFeedback('');
            return timeInterval;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [currentTab, isTimerRunning, timeInterval]);
  
  const renderLearnTab = () => (
    <div className="p-4 sm:p-6 lg:p-8 bg-blue-50 rounded-lg">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8 text-center">알파벳과 계이름 연결하기</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-3 sm:gap-4 lg:gap-6 max-w-7xl mx-auto">
        {letters.map(letter => (
          <div key={letter} className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow flex flex-col justify-center items-center hover:shadow-lg transition-shadow min-h-[120px] sm:min-h-[140px] lg:min-h-[160px]">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 text-center leading-none">{letter}</div>
            <div className="text-base sm:text-lg lg:text-xl text-center leading-tight">{noteMapping[letter]}</div>
          </div>
        ))}
      </div>
    </div>
  );
  
  const renderQuizTab = () => (
    <div className="p-4 sm:p-6 lg:p-8 bg-purple-50 rounded-lg flex flex-col items-center">
      <div className="mb-4 text-sm sm:text-base lg:text-lg font-medium text-gray-600">
        점수: {score} / {totalQuestions}
      </div>
      
      {/* 타이머 컨트롤 */}
      <div className="flex justify-between w-full mb-4 sm:mb-6 lg:mb-8 max-w-md lg:max-w-lg">
        <button
          onClick={toggleTimer}
          className={`px-3 sm:px-4 lg:px-6 py-2 lg:py-3 rounded font-bold text-sm sm:text-base lg:text-lg transition-colors ${
            isTimerRunning ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isTimerRunning ? '정지' : '시작'}
        </button>
        
        <div 
          className="text-base sm:text-lg lg:text-xl font-medium text-gray-700 bg-white px-3 sm:px-4 lg:px-6 py-1 lg:py-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={toggleSettingTime}
        >
          {timer}초
        </div>
      </div>
      
      {/* 시간 설정 */}
      {isSettingTime && (
        <div className="w-full mb-4 sm:mb-6 lg:mb-8 bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow max-w-md lg:max-w-lg">
          <h3 className="text-center mb-2 sm:mb-3 lg:mb-4 font-bold text-sm sm:text-base lg:text-lg">시간 간격 설정</h3>
          <div className="flex flex-wrap justify-center gap-2 lg:gap-3">
            {[3, 5, 10, 15, 20, 30].map(seconds => (
              <button
                key={seconds}
                onClick={() => handleTimeChange(seconds)}
                className={`px-2 sm:px-3 lg:px-4 py-1 lg:py-2 rounded text-sm sm:text-base lg:text-lg transition-colors ${
                  timeInterval === seconds ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {seconds}초
              </button>
            ))}
          </div>
          <div className="mt-3 lg:mt-4 flex items-center justify-center gap-2 lg:gap-3">
            <input
              type="number"
              min="1"
              max="60"
              value={timeInterval}
              onChange={(e) => setTimeInterval(parseInt(e.target.value) || 10)}
              className="w-16 sm:w-20 lg:w-24 p-1 lg:p-2 border border-gray-300 rounded text-center text-sm sm:text-base lg:text-lg"
            />
            <button
              onClick={() => handleTimeChange(timeInterval)}
              className="px-2 sm:px-3 lg:px-4 py-1 lg:py-2 bg-blue-500 text-white rounded text-sm sm:text-base lg:text-lg hover:bg-blue-600 transition-colors"
            >
              적용
            </button>
          </div>
        </div>
      )}
      
      {/* 현재 알파벳 표시 */}
      <div className="text-6xl sm:text-8xl lg:text-9xl font-bold my-6 sm:my-8 lg:my-12 text-purple-700 leading-none">{currentLetter}</div>
      
      {/* 계이름 보기/가리기 */}
      <div className="flex flex-col items-center mb-4 sm:mb-6 lg:mb-8">
        {showNote ? (
          <div className="text-lg sm:text-xl lg:text-2xl text-gray-700 bg-white py-2 px-4 sm:px-6 lg:px-8 rounded-lg shadow mb-2">
            {noteMapping[currentLetter]}
          </div>
        ) : (
          <div className="text-lg sm:text-xl lg:text-2xl bg-gray-200 py-2 px-4 sm:px-6 lg:px-8 rounded-lg shadow mb-2 h-8 sm:h-10 lg:h-12 w-20 sm:w-24 lg:w-32"></div>
        )}
        
        <button 
          onClick={toggleNote}
          className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-3 sm:px-4 lg:px-6 rounded text-sm sm:text-base lg:text-lg transition-colors"
        >
          {showNote ? '계이름 가리기' : '계이름 보기'}
        </button>
      </div>
      
      {/* 정답 입력 */}
      <p className="mb-4 text-gray-700 text-center text-sm sm:text-base lg:text-lg">이 알파벳에 해당하는 계이름은?</p>
      
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="계이름을 입력하세요 (예: 도, 레, 미...)"
        className="w-full max-w-md lg:max-w-lg p-2 sm:p-3 lg:p-4 border border-gray-300 rounded mb-4 text-center text-sm sm:text-base lg:text-lg"
        autoFocus
      />
      
      <button 
        onClick={handleSubmit}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 rounded w-full max-w-md lg:max-w-lg text-sm sm:text-base lg:text-lg transition-colors"
      >
        확인
      </button>
      
      {feedback && (
        <div className={`mt-4 p-2 sm:p-3 lg:p-4 rounded text-center w-full max-w-md lg:max-w-lg text-sm sm:text-base lg:text-lg ${
          feedback.includes('정답') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {feedback}
        </div>
      )}
    </div>
  );
  
  return (
    <div className="bg-blue-50 rounded-lg">
      {/* 탭 네비게이션 */}
      <div className="flex mb-4 sm:mb-6 lg:mb-8 bg-white rounded-lg p-1">
        <button
          onClick={() => setCurrentTab('learn')}
          className={`flex-1 py-2 sm:py-3 lg:py-4 px-3 sm:px-4 lg:px-6 rounded-md font-medium transition-colors text-sm sm:text-base lg:text-lg ${
            currentTab === 'learn' 
              ? 'bg-blue-500 text-white' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          📚 학습
        </button>
        <button
          onClick={() => setCurrentTab('quiz')}
          className={`flex-1 py-2 sm:py-3 lg:py-4 px-3 sm:px-4 lg:px-6 rounded-md font-medium transition-colors text-sm sm:text-base lg:text-lg ${
            currentTab === 'quiz' 
              ? 'bg-purple-500 text-white' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          🎯 퀴즈
        </button>
      </div>
      
      {/* 탭 컨텐츠 */}
      {currentTab === 'learn' && renderLearnTab()}
      {currentTab === 'quiz' && renderQuizTab()}
    </div>
  );
};

export default LearnMode; 