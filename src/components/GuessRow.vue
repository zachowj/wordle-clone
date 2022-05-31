<script setup lang="ts">
import { ref, watch, computed, inject } from "vue";
import { GameState } from "../composables/wordle";
import GuessLetter from "./GuessLetter.vue";

interface Props {
  row: number;
  submitted: boolean;
  invalidGuess: boolean;
}
const props = defineProps<Props>();
const gameState = inject<GameState>("gameState");
const shake = computed(
  () => props.invalidGuess && gameState?.guessIndex == props.row - 1
);
const colors = ref(Array(5).fill(""));
watch(
  () => props.submitted,
  (newValue, oldValue) => {
    // new Game started
    if (newValue === false && oldValue === true) {
      colors.value = Array(5).fill("");
    } else if (props.submitted) {
      const word = gameState?.guesses[props.row - 1] ?? "";
      const tempColor = Array(5).fill("gray");
      const letterPool = [];

      // Check if the letter is in the correct position of the answer
      for (let i = 0; i < 5; i++) {
        if (word[i] === gameState?.answer[i]) {
          tempColor[i] = "green";
        } else {
          letterPool.push(gameState?.answer[i]);
        }
      }

      // Check if the guessed letter is in the left over letters
      for (let i = 0; i < 5; i++) {
        if (tempColor[i] === "gray") {
          if (letterPool.includes(word[i])) {
            letterPool.splice(letterPool.indexOf(word[i]), 1);
            tempColor[i] = "yellow";
          }
        }
        colors.value[i] = tempColor[i];
      }
    }
  }
);
</script>

<template>
  <div
    class="grid max-w-xs grid-cols-5 gap-1 mx-auto mb-1"
    :class="{ shake: shake }"
  >
    <GuessLetter
      v-for="index in 5"
      :letter="gameState?.guesses[row - 1]?.[index - 1]"
      :key="index"
      :color="colors[index - 1]"
    />
  </div>
</template>

<style>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
