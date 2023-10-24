<template>
  <div>
      <h1>hi</h1>
      <button @click="test">test</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const nuxtApp = useNuxtApp();

onMounted(async () => {
  const dictionary = await nuxtApp.$getDictionary('zh');
  console.log(dictionary);
});

const test = async () => {
  const dictionary = await nuxtApp.$getDictionary('zh');
  console.log(dictionary);
}
</script>
