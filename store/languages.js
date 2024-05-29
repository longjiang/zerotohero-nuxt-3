import { defineStore } from 'pinia';
import Papa from 'papaparse';

export const useLanguagesStore = defineStore({
  id: 'languages',
  state: () => ({
    languages: []
  }),
  getters: {
    // Returns a language by its code
    getLanguageByCode: (state) => (code) => {
      return state.languages.find(language => language.code === code);
    }
  },
  actions: {
    async loadLanguages() {
      const csvFile = '/data/languages/common-languages.csv.txt';
      const result = await new Promise((resolve, reject) => {
        Papa.parse(csvFile, {
          download: true,
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            if (results?.data) {
              resolve(results.data);
            } else {
              reject(new Error("Error parsing CSV"));
            }
          }
        });
      });
      this.languages = result;
    }
  }
});
