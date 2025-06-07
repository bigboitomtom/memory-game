interface StartHardProps {
  onClick: () => void;
}

export function ButtonStartHard({ onClick }: StartHardProps) {
  return (
    <button type="button" className="btn btn-danger" onClick={onClick}>
      Start Game: Hardcore
    </button>
  )
}