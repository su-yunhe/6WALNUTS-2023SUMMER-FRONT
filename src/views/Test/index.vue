<template>
  <HomeNav />
  <Header />
  <!-- <MyVditor /> -->
  <!-- <div class="container">
    <div id="x-spreadsheet-demo"></div>
  </div> -->
  <TEditor />
</template>

<script setup>
import Header from './components/Header.vue'
import HomeNav from './components/HomeNav.vue'
// import MyVditor from './components/MyVditor.vue';
// import { onMounted } from 'vue';
import TEditor from '@/components/TEditor.vue'
import 'vditor/dist/index.css';
// import Spreadsheet from "x-data-spreadsheet";


</script>
<!-- <template>
  <editor-content :editor="editor" />
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const editor = useEditor({
  content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  extensions: [
    StarterKit,
  ],
})
</script> -->
