<script setup lang="ts">
import { ref, computed, watch, inject } from "vue";
import { GameState } from "../composables/wordle";

interface Props {
  letter: string;
}
const props = defineProps<Props>();
const gameState = inject<GameState>("gameState");
const color = ref("lightgray");

watch(
  () => gameState?.guessIndex,
  () => {
    gameState?.guesses.forEach((word: string) => {
      word.split("").forEach((letter: string, index: number) => {
        if (letter === props.letter && gameState?.answer[index] === letter) {
          color.value = "green";
        }
      });
    });
    if (color.value !== "green") {
      const allGuesses = gameState?.guesses.join("") ?? "";
      if (
        gameState?.answer.includes(props.letter) &&
        allGuesses.includes(props.letter)
      ) {
        color.value = "yellow";
      } else if (allGuesses.includes(props.letter)) {
        color.value = "darkgray";
      }
    }
  }
);

interface Emits {
  (event: "letterClicked", value: string): void;
}
defineEmits<Emits>();
</script>

<template>
  <button
    class="flex items-center justify-center w-12 h-12 m-1 text-lg uppercase border-2"
    :class="{
      'bg-green-500 text-white': color == 'green',
      'bg-yellow-500 text-white': color == 'yellow',
      'bg-gray-500 text-white': color == 'darkgray',
      'bg-gray-200': color == 'lightgray',
    }"
    @click="$emit('letterClicked', letter)"
  >
    {{ letter }}
  </button>
</template>
