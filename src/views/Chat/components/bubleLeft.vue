<template>
    <div>
        <div class="chatBox-others chatBox-left">
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

<script>

</script>

<style scoped>
.chatBox-others{
    position: relative;
    margin:12px;
    padding:5px 8px;
    word-break: break-all;
    background: #34acf1;
    border: 1px solid transparent;
    border-radius: 5px;
    max-width:480px;
    text-align: left;
    width: fit-content;
    float: left;
    clear: both;
}

.chatBox-left::before{
content: '';
position: absolute;
width: 0;
height: 0;
left: -14px;
top:5px;
border: 8px solid;
border-color: transparent #34acf1 transparent transparent ;
}

</style>