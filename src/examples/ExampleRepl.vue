<script setup lang="ts">
//import required modules 
import { Repl, ReplStore } from '@vue/repl'
import '@vue/repl/style.css'
import { data } from './examples.data'
import { inject, watchEffect, version, Ref } from 'vue'
import { resolveSFCExample, resolveNoBuildExample, onHashChange } from './utils'

const store = new ReplStore({
  defaultVueRuntimeURL: `https://unpkg.com/vue@${version}/dist/vue.esm-browser.js`
})

const preferComposition = inject('prefer-composition') as Ref<boolean>
const preferSFC = inject('prefer-sfc') as Ref<boolean>

watchEffect(updateExample)
onHashChange(updateExample)

/**
 * We perform some runtime logic to transform source files into different
 * API / format combinations:
 * - Options vs. Composition
 * - plain HTML vs. SFCs
 */

function updateExample() {
  let hash = location.hash.slice(1)
  if (!data.hasOwnProperty(hash)) {
    hash = 'hello-world'
    location.hash = `#${hash}`
  }
  store.setFiles(
    preferSFC.value
      ? resolveSFCExample(data[hash], preferComposition.value)
      : resolveNoBuildExample(data[hash], preferComposition.value),
    preferSFC.value ? 'App.vue' : 'index.html'
  )
}
</script>

<template>
  <Repl
    :store="store"
    :showImportMap="!preferSFC"
    :showCompileOutput="false"
    :clearConsole="false"
  />
</template>

<style scoped>
.vue-repl {
  max-width: 1105px;
  border-right: 1px solid var(--vt-c-divider-light);
  height: calc(100vh - var(--vt-nav-height) - var(--vt-banner-height, 0px));
}

@media (max-width: 960px) {
  .vue-repl {
    border: none;
    height: calc(
      100vh - var(--vt-nav-height) - var(--vt-banner-height, 0px) - 48px
    );
  }
}
</style>
