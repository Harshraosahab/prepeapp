import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { apiFetch } from "../../services/api";
import "./Quiz.css";

const Quiz = () => {
  const [searchParams] = useSearchParams();
  const quizId = searchParams.get("id");
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch quiz data
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        let quizData;
        if (quizId) {
          quizData = await apiFetch(`/api/quizzes/${quizId}`);
        } else {
          // Fetch all quizzes and use the first one
          const quizzes = await apiFetch("/api/quizzes");
          if (quizzes.length === 0) {
            setError("No quizzes available");
            return;
          }
          quizData = quizzes[0];
        }
        setQuiz(quizData);
        if (quizData.questions && quizData.questions.length > 0) {
          setQuestions(quizData.questions);
        } else {
          setError("This quiz has no questions");
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setError(error.message || "Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleAnswer = async (option) => {
    setSelected(option);
    const isCorrect = option === questions[current].correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setTimeout(async () => {
      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
        setSelected(null);
      } else {
        setFinished(true);
        // Submit practice session when quiz is completed
        if (quiz && quiz._id) {
          try {
            const finalScore = isCorrect ? score + 1 : score;
            const practiceData = {
              quiz: quiz._id,
              score: finalScore,
              totalQuestions: questions.length,
              correctAnswers: finalScore,
            };
            await apiFetch("/api/practice", {
              method: "POST",
              body: JSON.stringify(practiceData),
            });
            // Update leaderboard
            try {
              await apiFetch("/api/leaderboard/update", {
                method: "POST",
                body: JSON.stringify({
                  score: finalScore,
                }),
              });
            } catch (leaderboardError) {
              console.error("Error updating leaderboard:", leaderboardError);
            }
          } catch (error) {
            console.error("Error saving practice session:", error);
          }
        }
      }
    }, 800);
  };

  const restartQuiz = () => {
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setSelected(null);
  };

  if (loading) {
    return <div className="quiz-loader">Loading quiz...</div>;
  }

  if (error) {
    return <div className="quiz-error">{error}</div>;
  }

  if (questions.length === 0) {
    return <div className="quiz-error">No questions available in this quiz.</div>;
  }

  return (
    <div className="quiz-page">
      <div className="quiz-container animate-slide">
        {!finished ? (
          <>
            <div className="quiz-header">
              <div>
                <h2>Question {current + 1} / {questions.length}</h2>
                <p className="quiz-progress">
                  Score: <strong>{score}</strong>
                </p>
              </div>
              <div className="quiz-timer">
                <span>⏱️</span>
                <span>29:59 left</span>
              </div>
            </div>

            <div className="quiz-question">
              <h3>{questions[current].question}</h3>
            </div>

            <div className="quiz-options">
              {questions[current].options.map((option, idx) => (
                <button
                  key={idx}
                  className={`quiz-option ${
                    selected
                      ? option === questions[current].correctAnswer
                        ? "correct"
                        : option === selected
                        ? "wrong"
                        : ""
                      : ""
                  }`}
                  onClick={() => handleAnswer(option)}
                  disabled={!!selected}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="quiz-navigation">
              <button
                className="btn-prev"
                onClick={() => setCurrent(Math.max(0, current - 1))}
                disabled={current === 0}
              >
                ← Prev
              </button>
              <span className="answer-saved">Answer saved</span>
              <button
                className="btn-next"
                onClick={() => {
                  if (current < questions.length - 1) {
                    setCurrent(current + 1);
                    setSelected(null);
                  } else {
                    setFinished(true);
                  }
                }}
              >
                {current < questions.length - 1 ? "Next →" : "Finish"}
              </button>
            </div>
          </>
        ) : (
          <div className="quiz-result animate-fade">
            <h2>Quiz Completed!</h2>
            <p>
              You scored <strong>{score}</strong> out of{" "}
              {questions.length}.
            </p>
            <button onClick={restartQuiz} className="quiz-restart">
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
