<template>
  <div>
    <q-btn 
      v-for="word in tokenizedWords" 
      :key="word.text"
      flat
      :label="word.text"
      @click="showInfo(word)"
      ref="word">
      <template v-slot:label>
        <div class="pinyin">{{ word.pronunciation }}</div>
        {{ word.text }}
      </template>
    </q-btn>
    <q-dialog v-model="display" @hide="hideOverlay">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ selectedWord.pronunciation }}</div>
        </q-card-section>
        <q-card-section>
          <q-list>
            <q-item v-for="def in selectedWord.definitions" :key="def">
              <q-item-section>{{ def }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import { useLanguagesStore } from '~/store/languages';

// Define props
const { text } = defineProps({
  text: {
    type: String,
    required: true
  }
});

const nuxtApp = useNuxtApp();
const languagesStore = useLanguagesStore();

const tokenizedWords = ref([]);
const display = ref(false);
const selectedWord = ref({});
const dictionary = ref(null); // Declare the dictionary ref here

const showInfo = async (word) => {
  console.log(dictionary);
  selectedWord.value = await dictionary.value.lookup(word.text);
  display.value = true;
};

const hideOverlay = () => {
  display.value = false;
};


onMounted(async () => {
  // Ensure languages are loaded (or have some kind of mechanism in place to ensure this)
  await languagesStore.loadLanguages();

  const l1 = languagesStore.getLanguageByCode('en'); // Get the language by code 'en'
  const l2 = languagesStore.getLanguageByCode('zh'); // Example: Get another language by code 'zh'

  dictionary.value = await nuxtApp.$getDictionary(l1, l2); // Assign to the ref here

  tokenizedWords.value = await dictionary.value.tokenizeWithCache(text);
});
</script>

<style scoped>
.word-wrapper {
  display: inline-block;
  cursor: pointer;
  margin: 10px;
}

.pinyin {
  font-size: 12px;
  text-align: center;
  display: block;
}

.text {
  font-size: 18px;
  text-align: center;
}
</style>
