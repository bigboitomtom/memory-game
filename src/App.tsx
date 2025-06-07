import { ButtonAdd } from "./components/ButtonAdd";
import { ButtonHint } from "./components/ButtonHint";
import { ButtonRemove } from "./components/ButtonRemove";
import { ButtonClose } from "./components/ButtonClose";
import { ButtonStartNorm } from "./components/ButtonStartNorm";
import { ButtonStartHard } from "./components/ButtonStartHard";
import { ButtonHome } from "./components/ButtonHome";
import { Word } from "./components/Word";
import { Score, Lives, Hints } from "./components/GameStat";
import { GameReset } from "./components/GameReset";

import { useState } from "react";
import { generate } from "random-words";

interface Game {
  score: number;
  lives: number;
  hints: number;
  dictionary: Map<string, string>;
}

const currGame: Game = {
  score: 0,
  lives: 3,
  hints: 5,
  dictionary: new Map(),
};

function App() {
  // States for rendering
  const [home, setHome] = useState(true);
  const [hardMode, setHardMode] = useState(false);
  const [score, setScore] = useState(currGame.score);
  const [lives, setLives] = useState(currGame.lives);
  const [hints, setHints] = useState(currGame.hints);
  const [viewHints, setViewHints] = useState(false);
  const [word, setWord] = useState(() => generate({ maxLength: 2 }) as string);
  const [activeGame, setActiveGame] = useState(true);

  const handleClickStartNorm = () => {
    setHome(false);
  };

  const handleClickStartHard = () => {
    currGame.lives = 1;
    setLives(currGame.lives);
    setHome(false);
    setHardMode(true);
  };

  // When add is pressed
  const handleClickAdd = () => {
    // using currWord for race conditions, idk if this works tho
    const currWord = word;
    if (!currGame.dictionary.get(currWord)) {
      currGame.score++;
      setScore(currGame.score);
      currGame.dictionary.set(currWord, currWord);
    } else {
      currGame.lives--;
      setLives(currGame.lives);

      // Condition for game over
      currGame.lives <= 0 ? setActiveGame(false) : null;
    }

    const newWord = generate({ maxLength: 2 }) as string;
    setWord(newWord);
  };

  // When removed is pressed
  const handleClickRemove = () => {
    const currWord = word;
    if (currGame.dictionary.get(word)) {
      currGame.score++;
      setScore(currGame.score);
      currGame.dictionary.set(currWord, currWord);
    } else {
      currGame.lives--;
      setLives(currGame.lives);

      // Condition for game over
      currGame.lives <= 0 ? setActiveGame(false) : null;
    }

    const newWord = generate({ maxLength: 2 }) as string;
    setWord(newWord);
  };

  // When hint is pressed
  const handleClickHint = () => {
    // console.log for testing
    currGame.dictionary.forEach((key, value) => {
      console.log(`${key}: ${value}`);
    });
    if (currGame.hints > 0) {
      currGame.hints--;
      setViewHints(true);
      setHints(currGame.hints);
    }
  };

  const handleGameReset = () => {
    currGame.score = 0;
    currGame.lives = 3;
    currGame.hints = 5;
    currGame.dictionary = new Map();

    setScore(currGame.score);
    setLives(currGame.lives);
    setHints(currGame.hints);

    const newWord = generate({ maxLength: 2 }) as string;
    setWord(newWord);

    setActiveGame(true);
  };

  const handleButtonClose = () => {
    setViewHints(false);
  };

  const handleHome = () => {
    setActiveGame(true);
    setHome(true);
  }

  if (!activeGame) {
    return (
      <div>
        <Score score={score} />
        <h1>Game Over!</h1>
        <GameReset onClick={handleGameReset} />
        <ButtonHome onClick={handleHome} />
      </div>
    );
  }

  if (viewHints) {
    return (
      <div>
        <ul>
          {[...currGame.dictionary.entries()].map(([key, value]) => (
            <li key={key}>
              <h2>{value}</h2>
            </li>
          ))}
        </ul>
        <ButtonClose onClick={handleButtonClose} />
      </div>
    );
  }

  // If at home screen
  if (home) {
    return (
      <div>
        <h1>Memory Game</h1>
        <ButtonStartNorm onClick={handleClickStartNorm} />
        <ButtonStartHard onClick={handleClickStartHard} />
      </div>
    );
  } else if (hardMode) {
    // if hardMode is selected
    return (
      <div>
        <Word word={word} />
        <Score score={score} />
        <Lives lives={lives} />
        <ButtonAdd onClick={handleClickAdd} />
        <ButtonRemove onClick={handleClickRemove} />
      </div>
    );
  } else {
    // else the game has started
    return (
      <div>
        <Word word={word} />
        <Score score={score} />
        <Lives lives={lives} />
        <Hints hints={hints} />
        <ButtonAdd onClick={handleClickAdd} />
        <ButtonRemove onClick={handleClickRemove} />
        <ButtonHint onClick={handleClickHint} />
      </div>
    );
  }
}

export default App;
