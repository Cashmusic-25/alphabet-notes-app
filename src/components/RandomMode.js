import React, { useState, useEffect } from 'react';

const RandomMode = ({ noteMapping, onModeSelect }) => {
  const [currentLetter, setCurrentLetter] = useState('');
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
    setShowNote(false);
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
  
  // Timer effect for random mode
  useEffect(() => {
    newQuestion();
    
    let interval;
    if (isTimerRunning) {
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
  }, [isTimerRunning, timeInterval]);
  
  return (
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
          onClick={() => onModeSelect('quiz')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          퀴즈 모드
        </button>
        <button 
          onClick={() => onModeSelect('learn')}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          학습 모드
        </button>
        <button 
          onClick={() => onModeSelect('staff')}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          오선지 모드
        </button>
      </div>
    </div>
  );
};

export default RandomMode; 