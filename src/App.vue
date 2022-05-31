<script setup lang="ts">
import { onMounted, onUnmounted, provide } from "vue";
import GuessRow from "./components/GuessRow.vue";
import Keyboard from "./components/Keyboard.vue";
import { useWordle } from "./composables/wordle";
import { MAX_GUESSES } from "./const";

const {
  handleInput,
  isInvalidGuess,
  gameState,
  isGameOver,
  lostGame,
  newGame,
} = useWordle();

provide("gameState", gameState);

onMounted(() =>
  window.addEventListener("keyup", (event) => handleInput(event.key))
);
onUnmounted(() =>
  window.removeEventListener("keyup", (event) => handleInput(event.key))
);
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="border-b-2">
      <h1 class="py-2 text-3xl text-center">Wordle Clone</h1>
    </div>
    <div class="flex flex-col flex-grow w-full max-w-md mx-auto justify-evenly">
      <div
        v-if="isInvalidGuess"
        class="absolute px-4 py-2 text-white transform -translate-x-1/2 -translate-y-1/2 bg-pink-500 rounded-md invalid-word left-1/2"
        style="top: 10%"
      >
        Not in word list
      </div>
      <div>
        <GuessRow
          v-for="index in MAX_GUESSES"
          :key="index"
          :row="index"
          :submitted="index <= gameState.guessIndex"
          :invalidGuess="isInvalidGuess"
        />
        <div v-if="lostGame" class="my-5 text-5xl text-center text-red-600">
          The word was {{ gameState.answer }}
        </div>
      </div>
      <div v-if="isGameOver">
        <button
          @click="newGame"
          class="w-full px-4 py-2 font-bold text-white bg-blue-500 border border-blue-700 rounded hover:bg-blue-700"
        >
          New Game
        </button>
        <p class="mt-1 text-sm text-center">Press enter to start a new game</p>
      </div>
      <div v-if="!isGameOver">
        <Keyboard @letter-clicked="handleInput"></Keyboard>
      </div>
    </div>
  </div>
</template>

<style>
body {
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
}
</style>
