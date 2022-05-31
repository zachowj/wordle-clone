<script setup lang="ts">
interface Props {
  letter: string;
  color: string;
}
const props = withDefaults(defineProps<Props>(), { letter: "" });
</script>

<template>
  <div
    class="flex items-center justify-center h-16 col-span-1 text-3xl font-bold uppercase border-2 border-gray-200"
    :class="{
      'border-gray-500': color == '' && letter.length > 0,
      'bg-green-500 text-white': color == 'green',
      'bg-yellow-500 text-white': color == 'yellow',
      'bg-gray-400 text-white': color == 'gray',
    }"
  >
    {{ letter }}
  </div>
</template>
