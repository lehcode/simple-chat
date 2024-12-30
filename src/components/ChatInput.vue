<template>
  <div class="border-t dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
    <form @submit.prevent="handleSubmit" class="max-w-3xl mx-auto">
      <div class="relative">
        <textarea
          v-model="input"
          rows="1"
          class="w-full resize-none rounded-lg border dark:border-slate-700 bg-transparent p-3 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          @keydown.enter.prevent="handleSubmit"
          ref="textareaRef"
          @input="adjustHeight"
        ></textarea>
        <button
          type="submit"
          class="absolute right-2 top-2 rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600 disabled:opacity-50"
          :disabled="!input.trim()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'send', message: string): void
}>()

const input = ref('')
const textareaRef = ref<HTMLTextAreaElement>()

function handleSubmit() {
  const message = input.value.trim()
  if (message) {
    emit('send', message)
    input.value = ''
    if (textareaRef.value) {
      textareaRef.value.style.height = 'auto'
    }
  }
}

function adjustHeight() {
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px'
  }
}
</script>