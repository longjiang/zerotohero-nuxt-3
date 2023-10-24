import * as Comlink from 'comlink';

let workerInstance;
if (!import.meta.env.SSR) {
    workerInstance = new Worker(new URL('~/workers/dictionaryWorker.js', import.meta.url));
}

export default defineNuxtPlugin(nuxtApp => {
    let dictionaryService = null;

    const initWorker = async (l1, l2) => {
        if (!import.meta.env.SSR) {
            l1 = JSON.parse(JSON.stringify(l1));
            l2 = JSON.parse(JSON.stringify(l2));
            const link = Comlink.wrap(workerInstance);
            dictionaryService = await new link(l1, l2);
        }
    };

    const getDictionary = async (l1, l2) => {
        if (!dictionaryService) {
            await initWorker(l1, l2);
        }
        return dictionaryService;
    };

    // Inject the function into the Nuxt app
    nuxtApp.provide('getDictionary', getDictionary);
});
