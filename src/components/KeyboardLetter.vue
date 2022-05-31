<script setup lang="ts">
import { ref, computed, watch } from "vue";
interface Props {
  letter: string;
  answer: string;
  guesses: string[];
  guessIndex: number;
}

const props = defineProps<Props>();
const color = ref("lightgray");
const cls = computed(() => {
  switch (color.value) {
    case "green":
      return "bg-green-500";
    case "yellow":
      return "bg-yellow-500";
    case "darkgray":
      return "bg-gray-700";
    default:
      return "bg-gray-200";
  }
});

watch(
  () => props.guessIndex,
  () => {
    props.guesses.forEach((word: string) => {
      word.split("").forEach((letter: string, index: number) => {
        if (letter === props.letter && props.answer[index] === letter) {
          color.value = "green";
        }
      });
    });
    if (color.value !== "green") {
      const allGuesses = props.guesses.join("");
      if (
        props.answer.includes(props.letter) &&
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
    class="flex h-12 w-12 text-2xl items-center justify-center col-span-1 uppercase border-2 border-gray-200 m-1"
    :class="cls"
    @click="$emit('letterClicked', letter)"
  >
    {{ letter }}
  </button>
</template>
