import { currGame } from "./App.tsx";
import { generate } from "random-words";

/**
 * Event handler for when button "add" is clicked. Adds the given word to the
 * dictionary.
 *
 * @param word
 * @param setNumScore
 * @param setNumLives
 * @param setActiveGame
 * @param setWord
 *
 * @returns {void}
 */
export function handleClickAdd(
  word: string,
  setNumScore: React.Dispatch<React.SetStateAction<number>>,
  setNumLives: React.Dispatch<React.SetStateAction<number>>,
  setActiveGame: React.Dispatch<React.SetStateAction<boolean>>,
  setWord: React.Dispatch<React.SetStateAction<string>>
): void {
  const currWord = word;
  if (!currGame.dictionary.get(currWord)) {
    currGame.score++;
    setNumScore(currGame.score);
    currGame.dictionary.set(currWord, currWord);
  } else {
    currGame.lives--;
    setNumLives(currGame.lives);

    // Condition for game over
    currGame.lives <= 0 ? setActiveGame(false) : null;
  }

  const newWord = generate({ maxLength: 2 }) as string;
  setWord(newWord);
}

/**
 * Event handler for when button "remove" is clicked. Removes/skips the given
 * word.
 *
 * @param word
 * @param setNumScore
 * @param setNumLives
 * @param setActiveGame
 * @param setWord
 *
 * @returns {void}
 */
export function handleClickRemove(
  word: string,
  setNumScore: React.Dispatch<React.SetStateAction<number>>,
  setNumLives: React.Dispatch<React.SetStateAction<number>>,
  setActiveGame: React.Dispatch<React.SetStateAction<boolean>>,
  setWord: React.Dispatch<React.SetStateAction<string>>
): void {
  const currWord = word;
  if (currGame.dictionary.get(word)) {
    currGame.score++;
    setNumScore(currGame.score);
    currGame.dictionary.set(currWord, currWord);
  } else {
    currGame.lives--;
    setNumLives(currGame.lives);

    // Condition for game over
    currGame.lives <= 0 ? setActiveGame(false) : null;
  }

  const newWord = generate({ maxLength: 2 }) as string;
  setWord(newWord);
}

/**
 * Event handler for when "hint" is pressed. Provides a hint for the user.
 *
 * @param setViewHints
 * @param setNumHints
 *
 * @returns {void}
 */
export function handleClickHint(
  setViewHints: React.Dispatch<React.SetStateAction<boolean>>,
  setNumHints: React.Dispatch<React.SetStateAction<number>>
): void {
  currGame.dictionary.forEach((key, value) => {
    console.log(`${key}: ${value}`);
  });
  if (currGame.hints > 0) {
    currGame.hints--;
    setViewHints(true);
    setNumHints(currGame.hints);
  }
}

/**
 * Resets the state of the game.
 *
 * @param setNumScore
 * @param setNumLives
 * @param setNumHints
 * @param setWord
 * @param setActiveGame
 *
 * @returns {void}
 */
export function handleGameReset(
  setNumScore: React.Dispatch<React.SetStateAction<number>>,
  setNumLives: React.Dispatch<React.SetStateAction<number>>,
  setNumHints: React.Dispatch<React.SetStateAction<number>>,
  setWord: React.Dispatch<React.SetStateAction<string>>,
  setActiveGame: React.Dispatch<React.SetStateAction<boolean>>
): void {
  currGame.score = 0;
  currGame.lives = 3;
  currGame.hints = 5;
  currGame.dictionary = new Map();

  setNumScore(currGame.score);
  setNumLives(currGame.lives);
  setNumHints(currGame.hints);

  const newWord = generate({ maxLength: 2 }) as string;
  setWord(newWord);

  setActiveGame(true);
}

/**
 * Closes the dictionary hint page.
 *
 * @param setViewHints
 *
 * @returns {void}
 */
export function handleClickCloseDictionary(
  setViewHints: React.Dispatch<React.SetStateAction<boolean>>
): void {
  setViewHints(false);
}

/**
 * Event handler for when "Back to Home" is clicked. Returns the user back to
 * the home page.
 *
 * @param setActiveGame
 * @param setHome
 *
 * @returns {void}
 */
export function handleClickHome(
  setActiveGame: React.Dispatch<React.SetStateAction<boolean>>,
  setHome: React.Dispatch<React.SetStateAction<boolean>>
): void {
  setActiveGame(true);
  setHome(true);
}

/**
 * Starts a game in normal mode.
 *
 * @param setHome
 *
 * @returns {void}
 */
export function handleClickStartNorm(
  setHome: React.Dispatch<React.SetStateAction<boolean>>
): void {
  setHome(false);
}

/**
 * Starts a game in hard mode.
 *
 * @param setNumLives
 * @param setHome
 * @param setHardMode
 *
 * @returns {void}
 */
export function handleClickStartHard(
  setNumLives: React.Dispatch<React.SetStateAction<number>>,
  setHome: React.Dispatch<React.SetStateAction<boolean>>,
  setHardMode: React.Dispatch<React.SetStateAction<boolean>>
): void {
  currGame.lives = 1;
  setNumLives(currGame.lives);
  setHome(false);
  setHardMode(true);
}
