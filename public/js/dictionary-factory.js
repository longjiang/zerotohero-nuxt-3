importScripts('/js/base-dictionary.js')
console.log('hi')
class DictionaryFactory {
    static createDictionary(l1, l2) {
        let Dictionary;
        switch (l2.code) {
            case 'zh':
                if (typeof HskCedictDictionary === 'undefined') importScripts('/js/hsk-cedict-dictionary.js')
                Dictionary = HskCedictDictionary;
                break;
            case 'ja':
                if (typeof EdictDictionary === 'undefined') importScripts('/js/edict-dictionary.js')
                Dictionary = EdictDictionary;
                break;
            default:
              if (typeof WiktionaryCsvDictionary === 'undefined') importScripts('/js/wiktionary-csv-dictionary.js')
                Dictionary = WiktionaryCsvDictionary;
        }

        const dictionaryPromise = Dictionary.load({l1, l2});
        return dictionaryPromise;
    }
}
