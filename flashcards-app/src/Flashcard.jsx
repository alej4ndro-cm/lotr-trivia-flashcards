import ReactCardFlip from 'react-card-flip';
import { useState, useEffect } from 'react';
import './Flashcard.css';

const Flashcard = ({ question, answer, isFlipped, setIsFlipped, onAnswer, isAnswered }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [localAnswered, setLocalAnswered] = useState(false);

  useEffect(() => {
    setUserAnswer('');
    setFeedback(null);
    setLocalAnswered(false);
    // Do NOT reset flip state when a new card loads
    // Removing: setIsFlipped(false);
  }, [question]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localAnswered) return;
    
    const isCorrect = userAnswer.toLowerCase().trim() === answer.toLowerCase().trim();
    setFeedback(isCorrect);
    
    if (isCorrect) {
      setTimeout(() => {
        setIsFlipped(true); // Flip card
        onAnswer(isCorrect);
        setLocalAnswered(true);
      }, 500);
    } else {
      setUserAnswer('');
      setFeedback(false);
    }
  };

  const handleGiveUp = () => {
    if (localAnswered) return; // Prevent multiple score updates
  
    setFeedback(false);
    setIsFlipped(true);
  
    // Ensure score is updated ONLY the first time
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

      {/*Fix: Do NOT flip back when clicking on the back */}
      <div className="flashcard back" key="back">
        <div className="card-content">
          <p>{answer}</p>
        </div>
      </div>
    </ReactCardFlip>
  );
};

export default Flashcard;
