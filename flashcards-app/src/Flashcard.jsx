import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';
import './Flashcard.css';

const Flashcard = ({ question, answer, isFlipped, setIsFlipped }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Case-insensitive comparison and trim whitespace
    const isCorrect = userAnswer.toLowerCase().trim() === answer.toLowerCase().trim();
    
    setFeedback(isCorrect);
    if (isCorrect) {
      // Show the answer side after a correct guess
      setTimeout(() => setIsFlipped(true), 500);
    }
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div className="flashcard front" key="front">
        <p>{question}</p>
        <form onSubmit={handleSubmit} className="answer-form">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer..."
            className="answer-input"
            disabled={isFlipped}
          />
          <button 
            type="submit" 
            className="submit-button"
            disabled={isFlipped || !userAnswer.trim()}
          >
            Check Answer
          </button>
        </form>
        {feedback !== null && (
          <div className={`feedback ${feedback ? 'correct' : 'incorrect'}`}>
            {feedback ? 'Correct!' : 'Try again!'}
          </div>
        )}
      </div>

      <div className="flashcard back" onClick={() => setIsFlipped(false)} key="back">
        <p>{answer}</p>
      </div>
    </ReactCardFlip>
  );
};

export default Flashcard;