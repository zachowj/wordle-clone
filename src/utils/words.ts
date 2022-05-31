import { answers } from "../data/answers";
import { allowed } from "../data/allowed";

export const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * answers.length);
  return answers[randomIndex].toLowerCase();
};

export const isWordInList = (word: string) => {
  return answers.includes(word) || allowed.includes(word);
};
