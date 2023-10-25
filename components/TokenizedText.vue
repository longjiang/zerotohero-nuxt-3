<template>
  <div>
      <h1>{{ text }}</h1>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import { useLanguagesStore } from '~/store/languages';

const nuxtApp = useNuxtApp();
const languagesStore = useLanguagesStore();

// Define props
const props = defineProps({
  text: {
    type: String,
    default: ''
  }
});

onMounted(async () => {
  // Ensure languages are loaded (or have some kind of mechanism in place to ensure this)
  await languagesStore.loadLanguages();

  const l1 = languagesStore.getLanguageByCode('en'); // Get the language by code 'en'
  const l2 = languagesStore.getLanguageByCode('zh'); // Example: Get another language by code 'zh'

  const dictionary = await nuxtApp.$getDictionary(l1, l2);
  console.log(await dictionary.tokenizeWithCache(props.text));
});



</script>
