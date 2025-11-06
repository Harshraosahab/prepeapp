import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaAt, FaCode, FaGem } from "react-icons/fa";
import "./Practice.css";

const Practice = () => {
  const navigate = useNavigate();
  const [selectedDifficulties, setSelectedDifficulties] = useState({
    aptitude: "Medium",
    coding: "Medium",
    hr: "Medium"
  });

  const practiceRounds = [
    {
      id: "aptitude",
      title: "Aptitude Round",
      icon: <FaAt />,
      topics: ["Quantitative Analysis", "Logical Reasoning", "Verbal Ability"],
      difficulty: selectedDifficulties.aptitude,
      onDifficultyChange: (diff) => setSelectedDifficulties({...selectedDifficulties, aptitude: diff})
    },
    {
      id: "coding",
      title: "Coding Round",
      icon: <FaCode />,
      topics: ["Data Structures", "Algorithms", "System Design"],
      difficulty: selectedDifficulties.coding,
      onDifficultyChange: (diff) => setSelectedDifficulties({...selectedDifficulties, coding: diff})
    },
    {
      id: "hr",
      title: "HR & Behavioral",
      icon: <FaGem />,
      topics: ["Behavioral Questions", "Situational Judgement", "Resume-based"],
      difficulty: selectedDifficulties.hr,
      onDifficultyChange: (diff) => setSelectedDifficulties({...selectedDifficulties, hr: diff})
    }
  ];

  const handleStartPractice = (roundId, difficulty) => {
    navigate(`/quiz?type=${roundId}&difficulty=${difficulty}`);
  };

  return (
    <div className="practice-container">
      <h2>Choose Your Challenge</h2>
      <p className="practice-subtitle">Select a round to start your practice session.</p>

      <div className="practice-grid">
        {practiceRounds.map((round) => (
          <div key={round.id} className="practice-card">
            <div className="practice-icon">{round.icon}</div>
            <h3>{round.title}</h3>
            <ul className="practice-topics">
              {round.topics.map((topic, idx) => (
                <li key={idx}>{topic}</li>
              ))}
            </ul>
            
            <div className="difficulty-selector">
              {["Easy", "Medium", "Hard"].map((diff) => (
                <button
                  key={diff}
                  className={`difficulty-btn ${round.difficulty === diff ? "active" : ""}`}
                  onClick={() => round.onDifficultyChange(diff)}
                >
                  {diff}
                </button>
              ))}
            </div>

            <div className="practice-actions">
              <button
                className="btn-start-practice"
                onClick={() => handleStartPractice(round.id, round.difficulty)}
              >
                Start Practice
              </button>
              <button className="btn-customize">Customize</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Practice;
