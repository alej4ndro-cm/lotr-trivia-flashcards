import { useState } from 'react';
import './App.css';
import Flashcard from './Flashcard';

const flashcardsData = [
  // LOTR
  { question: "Who forged the One Ring?", answer: "Sauron" },
  /*{ question: "What is the name of Frodo's sword?", answer: "Sting" },
  { question: "Which city is the capital of Gondor?", answer: "Minas Tirith" },
  { question: "What race is Legolas?", answer: "Elf" },
  { question: "Who is the steward of Gondor during the War of the Ring?", answer: "Denethor" },
  { question: "What is the name of Gandalf’s horse?", answer: "Shadowfax" },
  { question: "What is the name of Aragorn’s sword?", answer: "Andúril" },
  { question: "Which creature did Gollum refer to as 'my precious'?", answer: "The One Ring" },
  { question: "What is the name of the volcano where the One Ring must be destroyed?", answer: "Mount Doom" },
  { question: "What is the name of the giant spider that attacks Frodo?", answer: "Shelob" },
  
  // Silmarillion & Deep Lore
  { question: "Who was the first Dark Lord before Sauron?", answer: "Morgoth (Melkor)" },
  { question: "What were the Two Trees of Valinor called?", answer: "Telperion and Laurelin" },
  { question: "Who was the greatest Elven smith who crafted the Silmarils?", answer: "Fëanor" },
  { question: "What was Beren’s impossible quest to win Lúthien’s hand in marriage?", answer: "Steal a Silmaril from Morgoth’s crown" },
  { question: "Which Maia was corrupted by Morgoth and later became the Dark Lord?", answer: "Sauron" },
  { question: "Who led the Noldor in their rebellion against the Valar?", answer: "Fëanor" },
  { question: "What is the name of the hidden city of the Elves in Beleriand?", answer: "Gondolin" },
  { question: "What was the name of the first Dragon created by Morgoth?", answer: "Glaurung" },
  { question: "What is the name of the greatest wolf of Morgoth that swallowed a Silmaril?", answer: "Carcharoth" },
  { question: "Who was the human warrior that killed Glaurung, the Father of Dragons?", answer: "Túrin Turambar" },
  { question: "What is the name of the jewel that Eärendil carries?", answer: "A Silmaril" },
  { question: "What is the name of the sword that cut a Silmaril from Morgoth’s crown?", answer: "Angrist" },
  { question: "What was the name of the last High King of the Noldor?", answer: "Gil-galad" },
  { question: "Who were the two Blue Wizards?", answer: "Alatar and Pallando" },
  { question: "What is the name of the eagle lord who helped in many battles?", answer: "Thorondor" },
  { question: "Who reforged Narsil into Andúril?", answer: "Elves of Rivendell (Elrond’s smiths)" },
  { question: "What was the name of Elrond's brother who chose mortality?", answer: "Elros" },
  { question: "Who is known as the 'Hound of Valinor'?", answer: "Huan" },
  { question: "Which Balrog fought and killed Fëanor?", answer: "Gothmog" },
  { question: "Who was the father of Elrond and Elros?", answer: "Eärendil" },
  { question: "What was Númenor’s downfall caused by?", answer: "Ar-Pharazôn's attempt to invade Aman" },
  { question: "Who created the Dwarves?", answer: "Aulë" },
  { question: "What is the name of the Elven realm that was ruled by Thingol and Melian?", answer: "Doriath" },
  { question: "What was the original name of Sauron?", answer: "Mairon" }*/
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
