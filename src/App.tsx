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

import {
  handleClickAdd,
  handleClickRemove,
  handleClickHint,
  handleGameReset,
  handleClickCloseDictionary,
  handleClickHome,
  handleClickStartNorm,
  handleClickStartHard,
} from "./EventHandler";

import { useState } from "react";
import { generate } from "random-words";

export interface Game {
  score: number;
  lives: number;
  hints: number;
  dictionary: Map<string, string>;
}

export const currGame: Game = {
  score: 0,
  lives: 3,
  hints: 5,
  dictionary: new Map(),
};

export function App() {
  // States for rendering
  const [home, setHome] = useState(true);
  const [hardMode, setHardMode] = useState(false);
  const [score, setNumScore] = useState(currGame.score);
  const [lives, setNumLives] = useState(currGame.lives);
  const [hints, setNumHints] = useState(currGame.hints);
  const [viewHints, setViewHints] = useState(false);
  const [word, setWord] = useState(() => generate({ maxLength: 2 }) as string);
  const [activeGame, setActiveGame] = useState(true);

  // if game is over/not an active game
  if (!activeGame) {
    return (
      <div>
        <Score score={score} />
        <h1>Game Over!</h1>
        <GameReset
          onClick={() =>
            handleGameReset(
              setNumScore,
              setNumLives,
              setNumHints,
              setWord,
              setActiveGame
            )
          }
        />
        <ButtonHome onClick={() => handleClickHome(setActiveGame, setHome)} />
      </div>
    );
  }

  // When view hint is used
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
        <ButtonClose onClick={() => handleClickCloseDictionary(setViewHints)} />
      </div>
    );
  }

  // If at home screen
  if (home) {
    return (
      <div>
        <h1>Memory Game</h1>
        <ButtonStartNorm onClick={() => handleClickStartNorm(setHome)} />
        <ButtonStartHard
          onClick={() =>
            handleClickStartHard(setNumLives, setHome, setHardMode)
          }
        />
      </div>
    );
  } else if (hardMode) {
    // if hardMode is selected
    return (
      <div>
        <Word word={word} />
        <Score score={score} />
        <Lives lives={lives} />
        <ButtonAdd
          onClick={() =>
            handleClickAdd(
              word,
              setNumScore,
              setNumLives,
              setActiveGame,
              setWord
            )
          }
        />
        <ButtonRemove
          onClick={() =>
            handleClickRemove(
              word,
              setNumScore,
              setNumLives,
              setActiveGame,
              setWord
            )
          }
        />
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
        <ButtonAdd
          onClick={() =>
            handleClickAdd(
              word,
              setNumScore,
              setNumLives,
              setActiveGame,
              setWord
            )
          }
        />
        <ButtonRemove
          onClick={() =>
            handleClickRemove(
              word,
              setNumScore,
              setNumLives,
              setActiveGame,
              setWord
            )
          }
        />
        <ButtonHint
          onClick={() => handleClickHint(setViewHints, setNumHints)}
        />
      </div>
    );
  }
}
