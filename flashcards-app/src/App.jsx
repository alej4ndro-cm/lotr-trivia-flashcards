import { useState } from 'react';
import './App.css';
import Flashcard from './Flashcard';

const flashcardsData = [
  // LOTR
  { question: "Who forged the One Ring?", answer: "Sauron" },
  { question: "What is the name of Frodo's sword?", answer: "Sting" },
  { question: "Which city is the capital of Gondor?", answer: "Minas Tirith" },
  { question: "What race is Legolas?", answer: "Elf" },
  { question: "Who is the steward of Gondor during the War of the Ring?", answer: "Denethor" },
  { question: "What is the name of Gandalf’s horse?", answer: "Shadowfax" },
  { question: "What is the name of Aragorn’s sword?", answer: "Andúril" },
  { question: "Which creature did Gollum refer to as 'my precious'?", answer: "The One Ring" },
  { question: "What is the name of the volcano where the One Ring must be destroyed?", answer: "Mount Doom" },
  { question: "What is the name of the giant spider that attacks Frodo?", answer: "Shelob" }
];

const App = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [answeredCards, setAnsweredCards] = useState(new Set());
  const [gameOver, setGameOver] = useState(false);

  const handleAnswer = (isCorrect) => {
    if (!answeredCards.has(currentCardIndex)) {
      setScore(prev => ({
        correct: isCorrect ? prev.correct + 1 : prev.correct,
        total: prev.total + 1
      }));

      setAnsweredCards(prev => {
        const updatedSet = new Set(prev);
        updatedSet.add(currentCardIndex);

        // Stop the game if all cards are answered
        if (updatedSet.size === flashcardsData.length) {
          setGameOver(true);
        }

        return updatedSet;
      });
    }
  };

  const nextCard = () => {
    // Prevent going past the last card if game is over
    if (gameOver) return;

    setIsFlipped(false);
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcardsData.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prevIndex) => 
      prevIndex === 0 ? flashcardsData.length - 1 : prevIndex - 1
    );
  };

  const restartGame = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setScore({ correct: 0, total: 0 });
    setAnsweredCards(new Set());
    setGameOver(false);
  };

  return (
    <div className="App">
      {!gameOver && <h1 className="fire-title">🔥 LOTR Trivia Cards 🔥</h1>}


      {gameOver ? (
        <div className="game-over">
        <h2 className="fire-text">🔥 Game Over! 🔥</h2>
        <p className="fire-score">🔥 Final Score: {score.correct}/{score.total} 🔥</p>

          <button onClick={restartGame} className="nav-button">Try Again?</button>
        </div>
      ) : (
        <>
          <p className="progress-indicator fire-progress">
            🔥 Card {currentCardIndex + 1} of {flashcardsData.length} 🔥
          </p>


          <div className="flashcard-container">
            <Flashcard
              question={flashcardsData[currentCardIndex].question}
              answer={flashcardsData[currentCardIndex].answer}
              isFlipped={isFlipped}
              setIsFlipped={setIsFlipped}
              onAnswer={handleAnswer}
              isAnswered={answeredCards.has(currentCardIndex)}
            />
          </div>

          <div className="button-container">
            <button onClick={prevCard} className="nav-button">Previous</button>
            <button onClick={nextCard} className="nav-button" disabled={gameOver}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
