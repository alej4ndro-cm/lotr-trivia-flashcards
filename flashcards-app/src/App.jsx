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
  const [shuffledCards, setShuffledCards] = useState([...flashcardsData]); // Start with default order
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
        if (updatedSet.size === shuffledCards.length) {
          setGameOver(true);
        }

        return updatedSet;
      });
    }
  };

  const shuffleCards = () => {
    const shuffled = [...flashcardsData]; // Copy the original set
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }

    setShuffledCards(shuffled); // Set shuffled cards
    setCurrentCardIndex(0); // Reset to first card
    setIsFlipped(false); // Ensure card starts on the front
    setAnsweredCards(new Set()); // Reset answered cards
    setScore({ correct: 0, total: 0 }); // Reset score
    setGameOver(false); // Ensure game resets
  };

  const nextCard = () => {
    setIsFlipped(false); // Ensure it flips to front before changing cards
    setTimeout(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % shuffledCards.length);
    }, 200); // Small delay to ensure reset before change
  };

  const prevCard = () => {
    setIsFlipped(false); // Flip to front before changing cards
    setTimeout(() => {
      setCurrentCardIndex((prevIndex) =>
        prevIndex === 0 ? shuffledCards.length - 1 : prevIndex - 1
      );
    }, 200);
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
      {!gameOver && <h1 className="fire-title">🧙‍♂️ LOTR Trivia Cards 🧙‍♂️</h1>}

      {gameOver ? (
        <div className="game-over">
          <h2 className="fire-text"> ☠️Game Over!☠️ </h2>
          <p className="fire-score">🔥 Final Score: {score.correct}/{score.total} 🔥</p>
          <button onClick={restartGame} className="nav-button">Try Again?</button>
        </div>
      ) : (
        <>
          <p className="progress-indicator fire-progress">
            📜 Card {currentCardIndex + 1} of {shuffledCards.length} 📜
          </p>

          <div className="flashcard-container">
            <Flashcard
              question={shuffledCards[currentCardIndex].question}
              answer={shuffledCards[currentCardIndex].answer}
              isFlipped={isFlipped}
              setIsFlipped={setIsFlipped}
              onAnswer={handleAnswer}
              isAnswered={answeredCards.has(currentCardIndex)}
            />
          </div>

          <div className="button-container">
            <button onClick={prevCard} className="nav-button">Previous</button>
            <button onClick={nextCard} className="nav-button" disabled={gameOver}>Next</button>
            <button onClick={shuffleCards} className="shuffle-button">⤨</button> {/* NEW BUTTON */}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
