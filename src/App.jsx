import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./component/WelcomePage";
import Quiz from "./component/Quiz";
import ScorePage from "./component/ScorePage";
import "./styles.css"; // Ensure CSS is properly imported

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ Welcome Page (Select Difficulty & Category) */}
        <Route path="/" element={<WelcomePage />} />

        {/* ✅ Quiz Page (Questions, Timer, Score Tracking) */}
        <Route path="/quiz" element={<Quiz />} />

        {/* ✅ Score Page (Final Results, Correct Answers, High Scores) */}
        <Route path="/score" element={<ScorePage />} />
      </Routes>
    </Router>
  );
};

export default App;