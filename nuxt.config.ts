// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "nuxt-quasar-ui"],
  plugins: [{ src: "~/plugins/dictionaryPlugin.js", mode: "client" }],
  quasar: {
    /* */
  },
});
