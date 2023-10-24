importScripts("/vendor/comlink/comlink.min.js");
importScripts("/js/dictionary-factory.js");

class DictionaryService {
  constructor(l1, l2) {
    this.dictionaryPromise = DictionaryFactory.createDictionary(l1, l2);
    this.dictionaryPromise.then((dictionary) => {
      this.dictionary = dictionary;
    });
  }

  async expose() {
    await this.dictionaryPromise;

    // Helper function to expose properties and methods
    const exposePropertiesAndMethods = (obj) => {
      for (let key of Object.getOwnPropertyNames(obj)) {
        if (
          typeof this.dictionary[key] === "function" &&
          key !== "constructor"
        ) {
          // For methods: call the original method
          this[key] = (...args) => {
            return this.dictionary[key](...args);
          };
        } else {
          // For properties: directly assign them
          this[key] = this.dictionary[key];
        }
      }
    };

    // Expose properties and methods from dictionary
    exposePropertiesAndMethods(Object.getPrototypeOf(this.dictionary));

    // If dictionary's prototype has a prototype (i.e., if dictionary has a base class)
    if (Object.getPrototypeOf(Object.getPrototypeOf(this.dictionary))) {
      exposePropertiesAndMethods(
        Object.getPrototypeOf(Object.getPrototypeOf(this.dictionary))
      );
    }
  }
}

Comlink.expose(DictionaryService);
