interface WordProps {
  word: string;
}

export function Word({ word }: WordProps) {
  return <h2>{word}</h2>;
}

