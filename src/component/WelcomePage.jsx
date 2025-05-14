import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App"; // Ensure CSS is properly imported

const WelcomePage = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("9"); // Default: General Knowledge
  const navigate = useNavigate();

  // Start Quiz with Selected Options
  const startQuiz = () => {
    navigate(`/quiz?difficulty=${difficulty}&category=${category}`);
  };

  return (
    <div className="welcome-container">
      <h1>Welcome to the Quiz Game</h1>

      {/* Difficulty Selection */}
      <div className="select-container">
        <h2>Select Difficulty</h2>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy 🟢</option>
          <option value="medium">Medium 🟡</option>
          <option value="hard">Hard 🔴</option>
        </select>
      </div>

      {/* Category Selection */}
      <div className="select-container">
        <h2>Select Category</h2>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="9">General Knowledge</option>
          <option value="21">Sports</option>
          <option value="23">History</option>
          <option value="27">Animals</option>
          <option value="31">Entertainment</option>
        </select>
      </div>

      {/* Start Game Button */}
      <button className="start-button" onClick={startQuiz}>Start Game 🚀</button>
    </div>
  );
};

export default WelcomePage;