<template>
  <div>
      <h1>hi</h1>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useLanguagesStore } from '~/store/languages';

const nuxtApp = useNuxtApp();
const languagesStore = useLanguagesStore();

onMounted(async () => {
  // Ensure languages are loaded (or have some kind of mechanism in place to ensure this)
  await languagesStore.loadLanguages();

  const l1 = languagesStore.getLanguageByCode('en'); // Get the language by code 'en'
  const l2 = languagesStore.getLanguageByCode('zh'); // Example: Get another language by code 'zh'

  const dictionary = await nuxtApp.$getDictionary(l1, l2);
  console.log('hsdfsjf', await dictionary.tokenizeWithCache('你好'));
});
</script>
