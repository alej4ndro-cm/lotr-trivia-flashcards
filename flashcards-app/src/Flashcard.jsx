import ReactCardFlip from 'react-card-flip';
import './Flashcard.css';

const Flashcard = ({ question, answer, isFlipped, setIsFlipped }) => {
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div className="flashcard front" onClick={() => setIsFlipped(true)} key="front">
        <p>{question}</p>
      </div>

      <div className="flashcard back" onClick={() => setIsFlipped(false)} key="back">
        <p>{answer}</p>
      </div>
    </ReactCardFlip>
  );
};

export default Flashcard;
