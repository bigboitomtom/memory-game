interface HintProps {
  onClick: () => void;
}

export function ButtonHint({ onClick }: HintProps) {
  return (
    <button type="button" className="btn btn-primary" onClick={onClick}>
      View Dictionary
    </button>
  );
}
