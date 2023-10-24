importScripts('/js/base-dictionary.js')
console.log('hi')
class DictionaryFactory {
    static createDictionary(l1, l2) {
        let Dictionary;
        switch (l2.code) {
            case 'zh':
                importScripts('/js/hsk-cedict-dictionary.js')
                Dictionary = HskCedictDictionary;
                break;
            case 'ja':
                importScripts('/js/edict-dictionary.js')
                Dictionary = EdictDictionary;
                break;
            default:
                importScripts('/js/wiktionary-csv-dictionary.js')
                Dictionary = WiktionaryCsvDictionary;
        }

        console.log("Loading dictionary...", Dictionary);
        const dictionary = Dictionary.load({l1, l2});
        console.log("Dictionary loaded.", dictionary);
        return dictionary;
    }
}
