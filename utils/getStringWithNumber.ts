type WordsType = [string, string, string];

export const getStringWithNumber = (value: number, words: WordsType) => {
  value = Math.abs(value) % 100;
  const restValue = value % 10;

  if (value > 10 && value < 20) return `${value} ${words[2]}`;

  if (restValue > 1 && restValue < 5) return `${value} ${words[1]}`;

  if (restValue === 1) return `${value} ${words[0]}`;

  return `${value} ${words[2]}`;
};
