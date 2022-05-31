<script setup lang="ts">
import KeyboardLetter from "./KeyboardLetter.vue";

interface Props {
  letters: string[];
  answer: string;
  guesses: string[];
  guessIndex: number;
}

const props = defineProps<Props>();
interface Emits {
  (event: "letterClicked", value: string): void;
}
defineEmits<Emits>();
</script>

<template>
  <div class="flex flex-row justify-between">
    <KeyboardLetter
      v-for="letter in letters"
      :index="letter"
      :letter="letter"
      :answer="answer"
      :guesses="guesses"
      :guessIndex="guessIndex"
      @letter-clicked="$emit('letterClicked', letter)"
    ></KeyboardLetter>
  </div>
</template>
