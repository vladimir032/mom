import { useState } from 'react';


export default function MoodSelector({ onSelectMood }) {
  const moods = [
    { icon: '😊', label: 'Хорошо' },
    { icon: '😐', label: 'Нормально' },
    { icon: '😢', label: 'Грустно' }
  ];

  return (
    <div className="mood-selector">
      <h3>Как ты себя сейчас чувствуешь?</h3>
      <div className="moods">
        {moods.map((mood, index) => (
          <span
            key={index}
            className="mood"
            onClick={() => onSelectMood(mood.label)}
          >
            {mood.icon}
          </span>
        ))}
      </div>
      <style jsx>{`
      .mood-selector {
        text-align: center;
        margin-top: 50px;
      }
        .moods {
          display: flex;
          gap: 10px;
          margin-top: 10px;
          padding-left: 70px;
        }
        .mood {
          font-size: 32px;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .mood:hover {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}
