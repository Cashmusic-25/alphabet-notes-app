import React, { useState, useEffect } from 'react';

// 1. 음표 데이터: step이 클수록 높은 음
const staffNotes = [
  { step: 0, note: 'C', korean: '도' }, // 가장 아래
  { step: 1, note: 'D', korean: '레' },
  { step: 2, note: 'E', korean: '미' },
  { step: 3, note: 'F', korean: '파' },
  { step: 4, note: 'G', korean: '솔' },
  { step: 5, note: 'A', korean: '라' },
  { step: 6, note: 'B', korean: '시' }, // 가장 위
];

const maxStep = 6;
const lineSpacing = 16; // px
const topMargin = 10; // px

const getNoteTop = (step) => `${topMargin + step * (lineSpacing / 2)}px`;

const StaffMode = () => {
  const [staffScore, setStaffScore] = useState(0);
  const [staffTotalQuestions, setStaffTotalQuestions] = useState(0);
  const [note1, setNote1] = useState(null);
  const [note2, setNote2] = useState(null);
  const [staffFeedback, setStaffFeedback] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);

  // 2. 랜덤 음표 2개 선택
  const getRandomStaffNotes = () => {
    let idxs = [];
    while (idxs.length < 2) {
      const idx = Math.floor(Math.random() * staffNotes.length);
      if (!idxs.includes(idx)) idxs.push(idx);
    }
    return [staffNotes[idxs[0]], staffNotes[idxs[1]]];
  };

  const newStaffQuestion = () => {
    const [note1Data, note2Data] = getRandomStaffNotes();
    setNote1(note1Data);
    setNote2(note2Data);
    setStaffFeedback('');
    setIsAnswered(false);
  };

  // 3. 정답 판정: step이 더 작으면 높은 음 (위쪽에 위치)
  const handleAnswer = (selectedNote) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setStaffTotalQuestions(staffTotalQuestions + 1);
    const otherNote = selectedNote === note1 ? note2 : note1;
    const isCorrect = selectedNote.step < otherNote.step;
    if (isCorrect) {
      const selectedColor = selectedNote === note1 ? '빨간색' : '파란색';
      setStaffFeedback(`정답입니다! 🎉 (${selectedColor}이 더 높은 음입니다)`);
      setStaffScore(staffScore + 1);
    } else {
      const correctColor = otherNote === note1 ? '빨간색' : '파란색';
      setStaffFeedback(`틀렸습니다. ${correctColor}이 더 높은 음입니다! 😅`);
    }
    setTimeout(newStaffQuestion, 2000);
  };

  // 4. 오선지 렌더링
  const renderStaff = () => {
    const lines = [0, 1, 2, 3, 4]; // 5줄의 오선
    return (
      <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-lg mb-4 max-w-2xl mx-auto">
        <div className="relative w-full h-24 bg-yellow-50 border-2 border-gray-300">
          {/* 오선 그리기 */}
          {lines.map((line, idx) => (
            <div
              key={line}
              className="absolute w-full h-0.5 bg-black"
              style={{ top: `${topMargin + idx * lineSpacing}px` }}
            />
          ))}
          {/* 첫 번째 음표 */}
          {note1 && (
            <div
              className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white cursor-pointer hover:bg-red-600 transition-colors"
              style={{
                top: getNoteTop(note1.step),
                left: '30%',
                transform: 'translateX(-50%)',
              }}
              onClick={() => handleAnswer(note1)}
            />
          )}
          {/* 두 번째 음표 */}
          {note2 && (
            <div
              className="absolute w-4 h-4 bg-blue-500 rounded-full border-2 border-white cursor-pointer hover:bg-blue-600 transition-colors"
              style={{
                top: getNoteTop(note2.step),
                left: '70%',
                transform: 'translateX(-50%)',
              }}
              onClick={() => handleAnswer(note2)}
            />
          )}
        </div>
        {/* 음표 설명 */}
        <div className="mt-2 flex justify-between text-xs sm:text-sm lg:text-base text-gray-600">
          <div>🔴 첫 번째 음표 ({note1?.korean})</div>
          <div>🔵 두 번째 음표 ({note2?.korean})</div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    newStaffQuestion();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-green-50 rounded-lg flex flex-col items-center">
      <div className="mb-4 text-sm sm:text-base lg:text-lg font-medium text-gray-600">
        점수: {staffScore} / {staffTotalQuestions}
      </div>
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-center">오선지 높낮이 퀴즈</h2>
      <p className="mb-4 text-gray-700 text-center text-sm sm:text-base lg:text-lg">어떤 음표가 더 높은 음인가요?</p>
      {renderStaff()}
      <div className="mb-4 text-center max-w-2xl">
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-2">음표를 클릭해서 답을 선택하세요!</p>
        <p className="text-xs sm:text-sm lg:text-base text-gray-500">아래쪽 = 낮은음, 위쪽 = 높은음</p>
      </div>
      {staffFeedback && (
        <div className={`mt-4 p-3 sm:p-4 lg:p-6 rounded text-center w-full max-w-2xl font-bold text-sm sm:text-base lg:text-lg ${
          staffFeedback.includes('정답') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {staffFeedback}
        </div>
      )}
    </div>
  );
};

export default StaffMode; 