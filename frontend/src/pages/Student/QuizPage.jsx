import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import './Student.css';

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [difficulty, setDifficulty] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Learning signals tracking
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [attempts, setAttempts] = useState([]);
  const [showHint, setShowHint] = useState(false);

  // Mock mastery score (in real app, this would come from props or context)
  const masteryScore = 65;

  // Mock question bank with hints
  const questionBank = {
    easy: [
      {
        question_id: "e1",
        question_text: "What is 2 + 3?",
        options: ["4", "5", "6", "7"],
        correct_answer: "5",
        difficulty: "easy",
        hint: "Add the two numbers together: 2 + 3"
      },
      {
        question_id: "e2",
        question_text: "Which of these is a prime number?",
        options: ["4", "6", "7", "8"],
        correct_answer: "7",
        difficulty: "easy",
        hint: "A prime number is only divisible by 1 and itself"
      },
      {
        question_id: "e3",
        question_text: "What is 10 - 4?",
        options: ["5", "6", "7", "8"],
        correct_answer: "6",
        difficulty: "easy",
        hint: "Subtract 4 from 10"
      }
    ],
    medium: [
      {
        question_id: "m1",
        question_text: "Solve for x: 2x + 5 = 13",
        options: ["3", "4", "5", "6"],
        correct_answer: "4",
        difficulty: "medium",
        hint: "First subtract 5 from both sides, then divide by 2"
      },
      {
        question_id: "m2",
        question_text: "What is the area of a rectangle with length 8 and width 5?",
        options: ["30", "35", "40", "45"],
        correct_answer: "40",
        difficulty: "medium",
        hint: "Area = length × width"
      },
      {
        question_id: "m3",
        question_text: "If y = 3x + 2, what is y when x = 4?",
        options: ["12", "14", "16", "18"],
        correct_answer: "14",
        difficulty: "medium",
        hint: "Substitute x = 4 into the equation: y = 3(4) + 2"
      }
    ],
    hard: [
      {
        question_id: "h1",
        question_text: "Solve the quadratic equation: x² - 5x + 6 = 0",
        options: ["x = 1, 6", "x = 2, 3", "x = 3, 4", "x = 4, 5"],
        correct_answer: "x = 2, 3",
        difficulty: "hard",
        hint: "Factor the quadratic: (x - 2)(x - 3) = 0"
      },
      {
        question_id: "h2",
        question_text: "What is the derivative of f(x) = x³ + 2x²?",
        options: ["3x² + 4x", "x² + 2x", "3x + 4", "x³ + x²"],
        correct_answer: "3x² + 4x",
        difficulty: "hard",
        hint: "Use the power rule: d/dx(xⁿ) = nxⁿ⁻¹"
      },
      {
        question_id: "h3",
        question_text: "Find the limit: lim(x→0) (sin x)/x",
        options: ["0", "1", "∞", "undefined"],
        correct_answer: "1",
        difficulty: "hard",
        hint: "This is a standard limit that equals 1"
      }
    ]
  };

  // Adaptive difficulty selection based on mastery score
  const getDifficultyLevel = (mastery) => {
    if (mastery < 40) return 'easy';
    if (mastery >= 40 && mastery <= 70) return 'medium';
    return 'hard';
  };

  // Get random question from selected difficulty
  const getRandomQuestion = (difficultyLevel) => {
    const questions = questionBank[difficultyLevel];
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  };

  // Load new question
  const loadNewQuestion = () => {
    const selectedDifficulty = getDifficultyLevel(masteryScore);
    const question = getRandomQuestion(selectedDifficulty);
    
    setCurrentQuestion(question);
    setDifficulty(selectedDifficulty);
    setSelectedAnswer('');
    setShowResult(false);
    setIsCorrect(false);
    setShowHint(false);
    setHintsUsed(0);
    setStartTime(Date.now());
  };

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    if (!showResult) {
      setSelectedAnswer(answer);
    }
  };

  // Handle hint request
  const handleShowHint = () => {
    if (!showHint && !showResult) {
      setShowHint(true);
      setHintsUsed(prev => prev + 1);
    }
  };

  // Submit answer and capture learning signals
  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;
    
    setLoading(true);
    
    setTimeout(() => {
      const endTime = Date.now();
      const timeSpent = Math.round((endTime - startTime) / 1000); // seconds
      const correct = selectedAnswer === currentQuestion.correct_answer;
      
      // Create attempt record
      const attempt = {
        attempt_id: Date.now().toString(),
        question_id: currentQuestion.question_id,
        is_correct: correct,
        time_taken: timeSpent,
        hints_used: hintsUsed,
        difficulty: difficulty,
        timestamp: new Date().toISOString()
      };
      
      // Store attempt data
      setAttempts(prev => [...prev, attempt]);
      
      setIsCorrect(correct);
      setTimeTaken(timeSpent);
      setShowResult(true);
      setLoading(false);
      
      // Log learning signals (in real app, this would be sent to backend)
      console.log('Learning Signal Captured:', attempt);
    }, 500);
  };

  // Load first question on component mount
  useEffect(() => {
    loadNewQuestion();
  }, []);

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'easy': return 'difficulty-easy';
      case 'medium': return 'difficulty-medium';
      case 'hard': return 'difficulty-hard';
      default: return '';
    }
  };

  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (!currentQuestion) {
    return <div className="quiz-loading">Loading quiz...</div>;
  }

  return (
    <div className="quiz-container page-fade-in">
      <div className="quiz-header">
        <h1 className="quiz-title">Adaptive Quiz</h1>
        <div className="quiz-info">
          <span className="mastery-info">Your Mastery: {masteryScore}%</span>
          <span className={`difficulty-badge ${getDifficultyColor(difficulty)}`}>
            {difficulty.toUpperCase()} Level
          </span>
          <span className="attempts-info">Attempts: {attempts.length}</span>
        </div>
      </div>

      <div className="quiz-card glass-panel">
        <div className="question-section">
          <h2 className="question-text">{currentQuestion.question_text}</h2>
          {showHint && (
            <div className="hint-section">
              <span className="hint-icon">💡</span>
              <span className="hint-text">{currentQuestion.hint}</span>
            </div>
          )}
        </div>

        <div className="options-section">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${
                selectedAnswer === option ? 'selected' : ''
              } ${
                showResult && option === currentQuestion.correct_answer ? 'correct' : ''
              } ${
                showResult && selectedAnswer === option && option !== currentQuestion.correct_answer ? 'incorrect' : ''
              }`}
              onClick={() => handleAnswerSelect(option)}
              disabled={showResult}
            >
              <span className="option-letter">{String.fromCharCode(65 + index)}</span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>

        {showResult && (
          <div className={`result-section ${isCorrect ? 'result-correct' : 'result-incorrect'}`}>
            <div className="result-message">
              {isCorrect ? (
                <>
                  <span className="result-icon">✓</span>
                  <span>Correct! Well done.</span>
                </>
              ) : (
                <>
                  <span className="result-icon">✗</span>
                  <span>Incorrect. The correct answer is: {currentQuestion.correct_answer}</span>
                </>
              )}
            </div>
            <div className="attempt-stats">
              <span className="stat-item">Time: {formatTime(timeTaken)}</span>
              <span className="stat-item">Hints: {hintsUsed}</span>
            </div>
          </div>
        )}

        <div className="quiz-actions">
          {!showResult ? (
            <div className="action-buttons">
              {!showHint && (
                <Button 
                  onClick={handleShowHint}
                  className="hint-btn"
                >
                  💡 Hint
                </Button>
              )}
              <Button 
                onClick={handleSubmitAnswer} 
                loading={loading}
                disabled={!selectedAnswer}
                className="submit-btn"
              >
                Submit Answer
              </Button>
            </div>
          ) : (
            <Button onClick={loadNewQuestion} className="next-btn">
              Next Question
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;