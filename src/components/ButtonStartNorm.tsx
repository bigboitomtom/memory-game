interface StartNormProps {
  onClick: () => void;
}

export function ButtonStartNorm({ onClick }: StartNormProps) {
  return (
    <button type="button" className="btn btn-success" onClick={onClick}>
      Start Game: Normal
    </button>
  )
}