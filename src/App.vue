<script setup lang="ts">
import GuessRow from "./components/GuessRow.vue";
import Keyboard from "./components/Keyboard.vue";
import { ref, computed, reactive, onMounted, onUnmounted, watch } from "vue";
import { wordList } from "./words";

const randomWord = () => {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
};
// const answer = "route";
const wonGame = computed(
  () => state.answer === state.guesses[state.guessIndex - 1]
);
const lostGame = computed(() => state.guessIndex === state.guesses.length);
const currentGuess = computed(() => state.guesses[state.guessIndex]);
const gameOver = ref(false);
const invalidGuess = ref(false);
const state = reactive({
  guesses: ["", "", "", "", "", ""],
  guessIndex: 0,
  answer: randomWord(),
});
const newGame = () => {
  state.guesses = ["", "", "", "", "", ""];
  state.guessIndex = 0;
  state.answer = randomWord();
  gameOver.value = false;
};

const validGuess = (guess: string) => {
  return guess.length === 5 && wordList.includes(guess);
};
const validLetter = (key: string) =>
  currentGuess.value?.length < 5 && key.length === 1 && key.match(/[a-z]/i);

const handleInput = (key: string) => {
  console.log(key);
  if (state.guessIndex >= 7 || wonGame.value) return;

  if (validLetter(key)) {
    state.guesses[state.guessIndex] += key.toLowerCase();
  } else if (key === "Backspace") {
    invalidGuess.value = false;
    state.guesses[state.guessIndex] = state.guesses[state.guessIndex].slice(
      0,
      -1
    );
  } else if (key === "Enter") {
    state.guesses[state.guessIndex] = state.guesses[state.guessIndex];
    if (validGuess(state.guesses[state.guessIndex])) {
      if (wonGame.value) {
        gameOver.value = true;
        return;
      }

      state.guessIndex++;
    } else {
      invalidGuess.value = true;
    }
  }
};

onMounted(() => {
  window.addEventListener("keyup", (event) => {
    handleInput(event.key);
  });
});
onUnmounted(() => {
  window.removeEventListener("keyup", (event) => {
    handleInput(event.key);
  });
});
</script>

<template>
  <!-- <div class="absolute">
    <p>answer: {{ state.answer }}</p>
    <p>current Guess: {{ state.guesses[state.guessIndex] }}</p>
  </div> -->
  <div class="flex flex-col max-w-md mx-auto h-screen justify-evenly">
    <div v-if="invalidGuess" class="invalid-word">Invalid Word</div>
    <div>
      <GuessRow
        v-for="index in 6"
        :key="index"
        :answer="state.answer"
        :guess="state.guesses[index - 1]"
        :submitted="index <= state.guessIndex"
      />
      <div
        v-if="lostGame"
        class="text-center my-3 text-5xl text-red-600 animate-bounce"
      >
        <p>You lose!!!</p>
        <p>The word was {{ state.answer }}</p>
      </div>
    </div>
    <button @click="newGame">New Game</button>
    <div>
      <Keyboard
        :answer="state.answer"
        :guesses="state.guesses"
        :guessIndex="state.guessIndex"
        @letter-clicked="handleInput"
      ></Keyboard>
    </div>
  </div>
</template>

<style lang="scss">
.invalid-word {
  position: absolute;
  top: 10%;
  left: 50%;
  color: pink;
}
</style>
