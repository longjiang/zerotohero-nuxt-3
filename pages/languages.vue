<template>
  <div>
    <ul v-if="!loading">
      <li v-for="language in languages" :key="language.id">
        {{ language.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { useLanguagesStore } from '~/store/languages';

export default {
  data() {
    return {
      loading: true
    };
  },
  async mounted() {
    const languagesStore = useLanguagesStore();
    if (!languagesStore.languages.length) {
      try {
        await languagesStore.loadLanguages();
      } catch (error) {
        console.error("Failed to load languages:", error);
      }
    }
    this.loading = false;
  },
  computed: {
    languages() {
      const languagesStore = useLanguagesStore();
      return languagesStore.languages;
    }
  }
}
</script>
