importScripts('/vendor/comlink/comlink.min.js');
importScripts('/js/dictionary-factory.js')

class DictionaryService {
  constructor(l1, l2) {
    this.dictionaryPromise = DictionaryFactory.createDictionary(l1, l2)
  

    // Dynamically create a proxy method or property for each method or property of the dictionary
    // for (let key of Object.getOwnPropertyNames(Object.getPrototypeOf(this.dictionary))) {
    //   if (typeof this.dictionary[key] === 'function' && key !== 'constructor' && methodNames.includes(key)) {
    //     // For methods: call the original method and JSON stringify its result
    //     this[key] = (...args) => {
    //       const result = this.dictionary[key](...args);
    //       return JSON.stringify(result);
    //     };
    //   } else {
    //     // For properties: directly assign them
    //     this[key] = this.dictionary[key];
    //   }
    // }
  }

  async lookupBySearch (search) {
    const dictionary = await this.dictionaryPromise;
    const result = await dictionary.lookupBySearch(search);
    return JSON.stringify(result);
  }
}

Comlink.expose(DictionaryService);

