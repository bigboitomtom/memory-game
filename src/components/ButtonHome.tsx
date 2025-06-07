interface HomeProps {
  onClick: () => void;
}

export function ButtonHome({ onClick }: HomeProps) {
  return <button type="button" className="btn btn-secondary" onClick={onClick}>
      Back to Home
    </button>
}