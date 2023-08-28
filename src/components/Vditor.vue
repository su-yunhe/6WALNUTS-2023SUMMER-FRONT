<template>
<div id="vditor" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

const vditor = ref<Vditor | null>(null)

onMounted(() => {
  vditor.value = new Vditor('vditor', {
    "height": 1000,
    "cache": {
      "enable": true
    },
    "mode": "ir",
    "toolbarConfig": {
      "pin": true
    },
    "counter": {
      "enable": true
    },
    "upload": {
      "url": "http://8.130.137.197/home/static/pics"
    }
  })
})
</script>