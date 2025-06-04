interface GameResetProps {
  onClick: () => void;
}

export function GameReset({ onClick }: GameResetProps) {
  return <button type="button" className="btn btn-primary" onClick={onClick}>New Game</button>
}