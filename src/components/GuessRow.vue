<script setup lang="ts">
import { ref, watch } from "vue";
import GuessLetter from "./GuessLetter.vue";

interface Props {
  answer: string;
  guess: string;
  submitted: boolean;
}
const props = defineProps<Props>();

const colors = ref(["", "", "", "", ""]);
watch(
  () => props.submitted,
  () => {
    if (props.submitted) {
      const tempColor = ["gray", "gray", "gray", "gray", "gray"];
      let letterPool = [];
      for (let i = 0; i < 5; i++) {
        if (props.guess[i] === props.answer[i]) {
          tempColor[i] = "green";
        } else {
          letterPool.push(props.answer[i]);
        }
      }

      for (let i = 0; i < 5; i++) {
        if (tempColor[i] === "gray") {
          if (letterPool.includes(props.guess[i])) {
            letterPool.splice(letterPool.indexOf(props.guess[i]), 1);
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
  <div class="grid grid-cols-5 gap-1 mb-1">
    <GuessLetter
      v-for="index in 5"
      :letter="guess[index - 1]"
      :key="index"
      :color="colors[index - 1]"
    />
  </div>
</template>
