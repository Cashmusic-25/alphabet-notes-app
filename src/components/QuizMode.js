import React, { useState, useEffect } from 'react';

const QuizMode = ({ noteMapping, onModeSelect }) => {
  const [currentLetter, setCurrentLetter] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  
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
  
  useEffect(() => {
    newQuestion();
  }, []);
  
  return (
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
          onClick={() => onModeSelect('learn')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          학습 모드
        </button>
        <button 
          onClick={() => onModeSelect('random')}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
        >
          랜덤 모드
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

export default QuizMode; 