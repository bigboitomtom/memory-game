interface CloseProps {
  onClick: () => void;
}

export function ButtonClose({ onClick }: CloseProps) {
  return (
    <button type="button" className="btn btn-primary" onClick={onClick}>
      Close Dictionary
    </button>
  );
}
