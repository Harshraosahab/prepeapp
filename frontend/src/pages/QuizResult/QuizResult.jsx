import React from "react";
import "./QuizResult.css";

const QuizResult = ({ score, totalQuestions }) => {
  return (
    <div className="quiz-result-container">
      <h2>Quiz Result</h2>
      <p>
        You scored <span>{score}</span> out of <span>{totalQuestions}</span>
      </p>
      <button onClick={() => window.location.reload()}>Retake Quiz</button>
    </div>
  );
};

export default QuizResult;
