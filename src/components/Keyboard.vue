<script setup lang="ts">
import KeyboardRow from "./KeyboardRow.vue";

interface Props {
  answer: string;
  guesses: string[];
  guessIndex: number;
}

const props = defineProps<Props>();

const keyboardLayout = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];
interface Emits {
  (event: "letterClicked", value: string): void;
}
const emit = defineEmits<Emits>();

const a = (letter: string) => {
  emit("letterClicked", letter);
};
</script>

<template>
  <div>
    <KeyboardRow
      v-for="index in 3"
      :index="index"
      :letters="keyboardLayout[index - 1]"
      :answer="answer"
      :guesses="guesses"
      :guessIndex="guessIndex"
      @letter-clicked="a"
    >
    </KeyboardRow>
  </div>
</template>
