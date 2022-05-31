import { ref, computed, reactive } from "vue";
import { getRandomWord, isWordInList } from "../utils/words";
import { MAX_GUESSES } from "../const";

export interface GameState {
  answer: string;
  guesses: string[];
  guessIndex: number;
}

const wonGame = computed(
  () => gameState.answer === gameState.guesses[gameState.guessIndex - 1]
);
const lostGame = computed(
  () => gameState.guessIndex === gameState.guesses.length && !wonGame.value
);
const isGameOver = computed(() => {
  return wonGame.value || lostGame.value;
});
const isInvalidGuess = ref(false);
const gameState = reactive({
  guesses: Array(MAX_GUESSES).fill("") as string[],
  guessIndex: 0,
  answer: getRandomWord(),
});
const newGame = () => {
  gameState.guesses = Array(MAX_GUESSES).fill("");
  gameState.guessIndex = 0;
  gameState.answer = getRandomWord();
};

const isValidGuess = (guess: string) => {
  return guess.length === 5 && isWordInList(guess);
};

const isValidLetter = (key: string) => {
  return (
    gameState.guesses[gameState.guessIndex]?.length < 5 &&
    key.length === 1 &&
    key.match(/[a-z]/i)
  );
};

const handleInput = (key: string) => {
  if (isGameOver.value) {
    if (key === "Enter") newGame();
    return;
  }

  if (gameState.guessIndex >= 7) return;

  if (isValidLetter(key)) {
    gameState.guesses[gameState.guessIndex] += key.toLowerCase();
  } else if (key === "Backspace" || key === "Del") {
    isInvalidGuess.value = false;
    // Remove last character from guess
    gameState.guesses[gameState.guessIndex] = gameState.guesses[
      gameState.guessIndex
    ].slice(0, -1);
  } else if (key === "Enter") {
    if (
      isInvalidGuess.value ||
      gameState.guesses[gameState.guessIndex].length < 5
    ) {
      return;
    }

    if (isValidGuess(gameState.guesses[gameState.guessIndex])) {
      gameState.guessIndex++;
    } else {
      // Show invalid guess message
      isInvalidGuess.value = true;
      // Hide banner after 1.5 seconds
      setTimeout(() => {
        isInvalidGuess.value = false;
      }, 1500);
    }
  }
};

export const useWordle = () => {
  return {
    gameState,
    newGame,
    handleInput,
    wonGame,
    lostGame,
    isGameOver,
    isInvalidGuess,
  };
};
