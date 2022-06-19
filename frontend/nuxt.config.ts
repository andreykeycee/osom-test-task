import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    strict: true,
    typeCheck: true
  },
  buildModules: ['@pinia/nuxt'],
  css: ['@/assets/styles/globals.sass'],
  styleResources: {
    sass: ['@/assets/styles/variables.sass'],
  },
  build: {
    extractCSS: true,
    styleResources: {
      sass: "@/assets/styles/variables.sass",
      hoistUseStatements: true,
    },
  },
  publicRuntimeConfig: {
    NUXT_ENV_API_URL: process.env.NUXT_ENV_API_URL
  },
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: `@import "@/assets/styles/variables.sass"\n`,
        },
      },
    },
  },
})
