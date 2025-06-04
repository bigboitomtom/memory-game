interface ScoreProps {
  score: number;
}

interface LivesProps {
  lives: number;
}

interface HintsProps {
  hints: number;
}

export function Score({ score }: ScoreProps) {
  return <h2>Score: {score}</h2>;
}

export function Lives({ lives }: LivesProps) {
  return <h2>Lives: {lives}</h2>;
}

export function Hints({ hints }: HintsProps) {
  return <h2>Hints: {hints}</h2>;
}

