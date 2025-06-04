interface ButtonRemoveProps {
  onClick: () => void;
}

export function ButtonRemove({ onClick }: ButtonRemoveProps) {
  return (
    <button type="button" className="btn btn-danger" onClick={onClick}>
      Remove
    </button>
  );
}
