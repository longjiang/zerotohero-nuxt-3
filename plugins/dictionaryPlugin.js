import * as Comlink from 'comlink';

let workerInstance;
if (!import.meta.env.SSR) {
    workerInstance = new Worker(new URL('~/workers/dictionaryWorker.js', import.meta.url));
}

export default defineNuxtPlugin(nuxtApp => {
    let dictionaryService = null;

    const initWorker = async (l2) => {
        if (!import.meta.env.SSR) {
            const link = Comlink.wrap(workerInstance);
            dictionaryService = await new link(l2);
        }
    };

    const getDictionary = async (l2) => {
        if (!dictionaryService) {
            await initWorker(l2);
        }
        return dictionaryService;
    };

    // Inject the function into the Nuxt app
    nuxtApp.provide('getDictionary', getDictionary);
});
