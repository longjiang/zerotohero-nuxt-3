importScripts('/vendor/comlink/comlink.min.js');
importScripts('/js/dictionary-factory.js')

class DictionaryService {
  constructor(l2) {
    this.dictionary = DictionaryFactory.createDictionary(l2)
    // Dynamically create a proxy method for each method of the dictionary
    for (let key of Object.getOwnPropertyNames(
      Object.getPrototypeOf(this.dictionary)
    )) {
      if (typeof this.dictionary[key] === 'function' && key !== 'constructor') {
        this[key] = this.dictionary[key].bind(this.dictionary)
      }
    }
  }
}

Comlink.expose(DictionaryService)
