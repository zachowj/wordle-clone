<script setup lang="ts">
import KeyboardLetter from "./KeyboardLetter.vue";

interface Props {
  letters: string[];
}

const props = defineProps<Props>();
</script>

<template>
  <div class="flex flex-row justify-between">
    <KeyboardLetter
      v-for="letter in letters"
      :index="letter"
      :letter="letter"
      v-bind:="$attrs"
    ></KeyboardLetter>
  </div>
</template>
