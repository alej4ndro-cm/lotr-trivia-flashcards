import ReactCardFlip from 'react-card-flip';
import { useState, useEffect } from 'react';
import './Flashcard.css';

const normalizeText = (str) => {
  return str
    .toLowerCase()
    .trim()
    .normalize("NFD") // Normalize accents
    .replace(/[\u0300-\u036f]/g, ""); // Remove diacritics
};

const containsKeywords = (userInput, correctAnswer) => {
  const correctWords = correctAnswer.split(" "); // Split answer into words
  return correctWords.some(word => userInput.includes(word)); // Check if user input has any key words
};

const Flashcard = ({ question, answer, isFlipped, setIsFlipped, onAnswer, isAnswered }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [localAnswered, setLocalAnswered] = useState(false);

  useEffect(() => {
    setUserAnswer('');
    setFeedback(null);
    setLocalAnswered(false);
  }, [question]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localAnswered) return;

    // Normalize both user input and correct answer
    const normalizedUserAnswer = normalizeText(userAnswer);
    const normalizedCorrectAnswer = normalizeText(answer);

    // Check if exact match OR user input contains key words from the correct answer
    const isCorrect =
        normalizedUserAnswer === normalizedCorrectAnswer ||
        containsKeywords(normalizedUserAnswer, normalizedCorrectAnswer);

    setFeedback(isCorrect);

    if (isCorrect) {
        setTimeout(() => {
            setIsFlipped(true);
            onAnswer(isCorrect);
            setLocalAnswered(true);
        }, 500);
    } else {
        setUserAnswer('');
        setFeedback(false);
    }
  };

  const handleGiveUp = () => {
    if (localAnswered) return; // Prevent multiple clicks
  
    setFeedback(false);
    setIsFlipped(true);
  
    setTimeout(() => {
      if (!localAnswered) { 
        onAnswer(false);
        setLocalAnswered(true);
      }
    }, 500);
  };  

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div className="flashcard front" key="front">
        <div className="card-content">
          <p>{question}</p>
          <form onSubmit={handleSubmit} className="answer-form">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your answer..."
              className="answer-input"
              disabled={isFlipped || localAnswered}
            />
            <div className="button-group">
              <button 
                type="submit" 
                className="submit-button"
                disabled={isFlipped || !userAnswer.trim() || localAnswered}
              >
                Check Answer
              </button>
              <button 
                type="button" 
                className="submit-button"
                onClick={handleGiveUp}
                disabled={isFlipped || localAnswered}
              >
                Show Answer
              </button>
            </div>
          </form>
          {feedback !== null && (
            <div className={`feedback ${feedback ? 'correct' : 'incorrect'}`}>
              {feedback ? 'Correct!' : 'Try again!'}
            </div>
          )}
        </div>
      </div>

      <div className="flashcard back" key="back">
        <div className="card-content">
          <p>{answer}</p>
        </div>
      </div>
    </ReactCardFlip>
  );
};

export default Flashcard;