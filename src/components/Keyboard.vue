<script setup lang="ts">
import KeyboardRow from "./KeyboardRow.vue";

const keyboardLayout = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Del"],
];
</script>

<template>
  <div>
    <KeyboardRow
      v-for="index in 3"
      :index="index"
      :letters="keyboardLayout[index - 1]"
      v-bind="$attrs"
    >
    </KeyboardRow>
  </div>
</template>
