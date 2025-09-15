import React, { useState, useContext } from "react";
import { Box, Typography, Button, LinearProgress, Stack } from "@mui/material";
import { useUser, UserContext } from "../context/UserContext";

const defaultQuestions = [
  {
    id: 1,
    question: "What is the first step when facing an attacker?",
    options: ["Run away", "Stay calm and assess", "Fight immediately", "Call for help"],
    answer: 1,
  },
  {
    id: 2,
    question: "Where should you aim to strike in self-defense?",
    options: ["Eyes, nose, throat", "Legs", "Arms", "Back"],
    answer: 0,
  },
  {
    id: 3,
    question: "What does situational awareness mean?",
    options: [
      "Knowing your surroundings",
      "Focusing on your phone",
      "Ignoring people nearby",
      "Daydreaming",
    ],
    answer: 0,
  },
];

export default function TrainingQuiz({ questions = defaultQuestions }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const { user } = useUser();
  const { addPoints } = useContext(UserContext);

  const handleAnswer = async (index) => {
    const questionId = questions[current].id;
    const selectedAnswer = questions[current].options[index];

    try {
      console.log("Submitting answer to:", "http://localhost:8001/training/answer");
      const response = await fetch("http://localhost:8001/training/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          question_id: questionId,
          answer: selectedAnswer,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert("Failed to submit answer. Please try again.");
        return;
      }
      const data = await response.json();
      if (data.is_correct) {
          setScore((prev) => prev + 1);
          addPoints(data.earned_points);
          alert(`Correct! You earned ${data.earned_points} points.`);
        } else {
          alert("Incorrect answer. Try again.");
        }
      if (current + 1 < questions.length) {
          setCurrent((prev) => prev + 1);
        } else {
          setShowResult(true);
        }
    } catch (error) {
      alert("Error submitting answer. Please try again.");
      console.error(error);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <>
      {!showResult ? (
        <>
          <Typography variant="h6" gutterBottom>
            Question {current + 1} of {questions.length}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {questions[current].question}
          </Typography>
          <Stack spacing={2}>
            {questions[current].options.map((option, i) => (
              <Button
                key={option} // Use option text as unique key if unique text
                variant="outlined"
                onClick={() => handleAnswer(i)}
                sx={{ textTransform: "none", fontSize: "1rem" }}
              >
                {option}
              </Button>
            ))}
          </Stack>
        </>
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            Quiz Completed!
          </Typography>
          <Typography variant="body1">
            Your score: {score} out of {questions.length}
          </Typography>
          <Typography variant="body1">Points earned: {score * 10}</Typography>
          <Button variant="contained" onClick={handleRestart} sx={{ mt: 2 }}>
            Restart Quiz
          </Button>
        </>
      )}
    </>
  );
}
