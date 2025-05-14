import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ScorePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, userAnswers } = location.state;
  const [name, setName] = useState("");
  const [highScores, setHighScores] = useState([]);

  // Load High Scores from Local Storage
  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    setHighScores(savedScores);
  }, []);

  // Save Score with User Name
  const saveScore = () => {
    if (!name) return;

    const newScore = { name, score };
    const updatedScores = [...highScores, newScore]
      .sort((a, b) => b.score - a.score) // Sort scores (highest first)
      .slice(0, 5); // Keep only top 5 scores

    setHighScores(updatedScores);
    localStorage.setItem("leaderboard", JSON.stringify(updatedScores));
  };

  return (
    <div className="score-container">
      {/* Custom Message Based on Score */}
      {score >= 5 ? (
        <h1 style={{ color: "green" }}>🎉 Congratulations! You Passed! 🎉</h1>
      ) : (
        <h1 style={{ color: "red" }}>❌ Sorry, you did not pass. Try Again! ❌</h1>
      )}

      <h2>Your Score: {score}/10</h2>

      {/* Enter Name to Save Score */}
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={saveScore}>Save Score</button>

      {/* Display Leaderboard */}
      <h2>🏆 Leaderboard</h2>
      <ul className="leaderboard">
        {highScores.map((entry, index) => (
          <li key={index}>
            <strong>{entry.name}</strong>: {entry.score}/10
          </li>
        ))}
      </ul>

      {/* ✅ Correct Answers Section */}
      <h2>✅ Correct Answers</h2>
      <ul>
        {userAnswers.map((item, index) => (
          <li key={index} style={{ color: item.userAnswer === "Not Answered ❌" ? "" : "green" }}>
            {item.question} - {item.userAnswer === "Not Answered ❌" ? "❌ Not Answered" : `✅ ${item.correct}`}
          </li>
        ))}
      </ul>

      <button onClick={() => navigate("/")}>Play Again 🔄</button>
    </div>
  );
};

export default ScorePage;