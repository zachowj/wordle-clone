<script setup lang="ts">
import { computed } from "vue";
interface Props {
  letter: string;
  color: string;
}
const props = withDefaults(defineProps<Props>(), { letter: "" });

const isGreen = computed(() => props.color === "green");
const isYellow = computed(() => props.color === "yellow");
const isGray = computed(() => props.color === "gray");
</script>

<template>
  <div
    class="flex h-16 text-4xl items-center justify-center col-span-1 uppercase border-2 border-gray-200"
    :class="{
      'bg-green-500': isGreen,
      'bg-yellow-500': isYellow,
      'bg-gray-500': isGray,
    }"
  >
    {{ letter }}
  </div>
</template>

<style scroped>
div {
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
  font-weight: 700;
}
</style>
