interface ButtonAddProps {
  onClick: () => void;
}

export function ButtonAdd({ onClick }: ButtonAddProps) {
  return (
    <button type="button" className="btn btn-success" onClick={onClick}>
      Add
    </button>
  );
}
