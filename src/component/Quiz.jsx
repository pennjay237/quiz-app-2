import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Quiz = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const difficulty = params.get("difficulty") || "easy";
  const category = params.get("category") || "9";
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [progress, setProgress] = useState(100); // Start at full bar
  const [userAnswers, setUserAnswers] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);

  // Fetch Questions
  useEffect(() => {
  fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=boolean`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched Questions:", data); // Debugging: Log fetched data
      if (data.results) {
        setQuestions(data.results);
      } else {
        console.error("No questions returned from API");
      }
    })
    .catch((err) => console.error("Error fetching questions:", err));
}, [category, difficulty]);

  // Timer Logic with Progress Bar
  useEffect(() => {
    if (timeLeft === 0) {
      markAsUnanswered();
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
      setProgress((timeLeft - 1) * (100 / 15)); // Reduce progress
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Mark Question as Unanswered
  const markAsUnanswered = () => {
    setUserAnswers([
      ...userAnswers,
      { question: questions[currentIndex]?.question, correct: questions[currentIndex]?.correct_answer, userAnswer: "Not Answered ❌" }
    ]);
    setIsAnswered(true);
    setTimeout(nextQuestion, 1000);
  };

  // Handle Answer Selection
  const handleAnswer = (answer) => {
    if (isAnswered) return;
    setIsAnswered(true);

    if (answer === questions[currentIndex]?.correct_answer) {
      setScore(score + 1);
    }

    setUserAnswers([
      ...userAnswers,
      { question: questions[currentIndex]?.question, correct: questions[currentIndex]?.correct_answer, userAnswer: answer }
    ]);

    setTimeout(nextQuestion, 1000);
  };

  // Move to Next Question
  const nextQuestion = () => {
    if (currentIndex < 9) {
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(15);
      setProgress(100); // Reset progress bar
      setIsAnswered(false);
    } else {
      navigate(`/score`, { state: { score, userAnswers } });
    }
  };

  if (!questions.length) return <h2>Loading Questions...</h2>;

  return (
    <div className="quiz-container">
      {/* Timer Bar */}
      <div className="timer-bar">
        <div className="progress" style={{ width: `${progress}%`, background: timeLeft <= 5 ? "red" : "green" }}></div>
      </div>

      {/* Header */}
      <div className="quiz-header">
        <p>Question {currentIndex + 1}/10</p>
        <h2>{questions[currentIndex]?.category}</h2>
        <p>⏳ {timeLeft}s</p>
      </div>

      {/* Question */}
      <h2 className="question">{questions[currentIndex]?.question}</h2>

      {/* Answer Buttons */}
      <div className="answers">
        <button disabled={isAnswered} onClick={() => handleAnswer("True")}>True</button>
        <button disabled={isAnswered} onClick={() => handleAnswer("False")}>False</button>
      </div>

      {/* Navigation Buttons */}
      <div className="nav-buttons">
        <button onClick={() => navigate("/")}>Go to Welcome Page</button>
        <button onClick={nextQuestion}>Next</button>
      </div>
    </div>
  );
};

export default Quiz;