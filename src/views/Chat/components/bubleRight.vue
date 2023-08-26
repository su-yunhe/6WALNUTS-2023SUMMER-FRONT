<template>
    <div>
        <div class="chatBox-self chatBox-right">
        {{props.content}}
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    content:String,
})
</script>

<style scoped>
.chatBox-self{
    position: relative;
    margin:12px;
    padding:5px 8px;
    word-break: break-all;
    background: #a3a0a3;
    border: 1px solid transparent;
    border-radius: 5px;
    max-width:480px;
    text-align: left;
    width: fit-content;
    float: right;
    clear: both;
}

.chatBox-right::after{
    content: '';
        position: absolute;
        width: 0;
        height: 0;
        right: -14px;
        top:5px;
        border: 8px solid;
        border-color: transparent  transparent transparent#a3a0a3 ;
}

</style>
