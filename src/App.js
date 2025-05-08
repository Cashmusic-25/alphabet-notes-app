import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentLetter, setCurrentLetter] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [mode, setMode] = useState('random'); // 'quiz', 'learn', or 'random'
  const [timeInterval, setTimeInterval] = useState(10);
  const [timer, setTimer] = useState(10);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showNote, setShowNote] = useState(false);
  const [isSettingTime, setIsSettingTime] = useState(false);
  
  const noteMapping = {
    'A': '라 (La)',
    'B': '시 (Si)',
    'C': '도 (Do)',
    'D': '레 (Re)',
    'E': '미 (Mi)',
    'F': '파 (Fa)',
    'G': '솔 (Sol)'
  };
  
  const letters = Object.keys(noteMapping);
  
  // Generate a random letter
  const getRandomLetter = () => {
    const randomIndex = Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
  };
  
  // Start with a random letter and set up timer for random mode
  useEffect(() => {
    newQuestion();
    
    // Timer effect for random mode
    let interval;
    if (mode === 'random' && isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            setCurrentLetter(getRandomLetter());
            setShowNote(false);
            return timeInterval;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [mode, isTimerRunning, timeInterval]);
  
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

  const renderLearnMode = () => (
    <div className="p-4 bg-blue-50 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">알파벳과 계이름 연결하기</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {letters.map(letter => (
          <div key={letter} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div className="text-4xl font-bold">{letter}</div>
            <div className="text-xl">{noteMapping[letter]}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-4">
        <button 
          onClick={() => setMode('quiz')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          퀴즈 모드
        </button>
        <button 
          onClick={() => setMode('random')}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
        >
          랜덤 모드
        </button>
      </div>
    </div>
  );
  
  const renderQuizMode = () => (
    <div className="p-4 bg-blue-50 rounded-lg flex flex-col items-center">
      <div className="mb-4 text-sm font-medium text-gray-600">
        점수: {score} / {totalQuestions}
      </div>
      
      <div className="text-6xl font-bold mb-6">{currentLetter}</div>
      
      <p className="mb-4 text-gray-700">이 알파벳에 해당하는 계이름은?</p>
      
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="계이름을 입력하세요 (예: 도, 레, 미...)"
        className="w-full p-2 border border-gray-300 rounded mb-4 text-center"
        autoFocus
      />
      
      <button 
        onClick={handleSubmit}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
      >
        확인
      </button>
      
      {feedback && (
        <div className={`mt-4 p-2 rounded text-center w-full ${feedback.includes('정답') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {feedback}
        </div>
      )}
      
      <div className="mt-6 flex justify-center gap-4">
        <button 
          onClick={() => setMode('learn')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          학습 모드
        </button>
        <button 
          onClick={() => setMode('random')}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
        >
          랜덤 모드
        </button>
      </div>
    </div>
  );
  
  const renderRandomMode = () => (
    <div className="p-4 bg-purple-50 rounded-lg flex flex-col items-center">
      <div className="flex justify-between w-full mb-4">
        <button
          onClick={toggleTimer}
          className={`px-4 py-2 rounded font-bold ${isTimerRunning ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
        >
          {isTimerRunning ? '정지' : '시작'}
        </button>
        
        <div 
          className="text-lg font-medium text-gray-700 bg-white px-4 py-1 rounded-full cursor-pointer hover:bg-gray-100"
          onClick={toggleSettingTime}
        >
          {timer}초
        </div>
      </div>
      
      {isSettingTime && (
        <div className="w-full mb-4 bg-white p-4 rounded-lg shadow">
          <h3 className="text-center mb-2 font-bold">시간 간격 설정</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {[3, 5, 10, 15, 20, 30].map(seconds => (
              <button
                key={seconds}
                onClick={() => handleTimeChange(seconds)}
                className={`px-3 py-1 rounded ${timeInterval === seconds ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {seconds}초
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-center">
            <input
              type="number"
              min="1"
              max="60"
              value={timeInterval}
              onChange={(e) => setTimeInterval(parseInt(e.target.value) || 10)}
              className="w-20 p-1 border border-gray-300 rounded text-center mr-2"
            />
            <button
              onClick={() => handleTimeChange(timeInterval)}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              적용
            </button>
          </div>
        </div>
      )}
      
      <div className="text-8xl font-bold my-8 text-purple-700">{currentLetter}</div>
      
      <div className="flex flex-col items-center mb-4">
        {showNote ? (
          <div className="text-xl text-gray-700 bg-white py-2 px-6 rounded-lg shadow mb-2">
            {noteMapping[currentLetter]}
          </div>
        ) : (
          <div className="text-xl bg-gray-200 py-2 px-6 rounded-lg shadow mb-2 h-10 w-24"></div>
        )}
        
        <button 
          onClick={toggleNote}
          className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
        >
          {showNote ? '계이름 가리기' : '계이름 보기'}
        </button>
      </div>
      
      <div className="mt-6 flex justify-center gap-4">
        <button 
          onClick={() => setMode('quiz')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          퀴즈 모드
        </button>
        <button 
          onClick={() => setMode('learn')}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          학습 모드
        </button>
      </div>
    </div>
  );
  
  return (
    <div className="max-w-md mx-auto my-8">
      <h1 className="text-2xl font-bold mb-6 text-center">알파벳-계이름 연습 어플</h1>
      
      {mode === 'learn' ? renderLearnMode() : mode === 'quiz' ? renderQuizMode() : renderRandomMode()}
    </div>
  );
}

export default App;