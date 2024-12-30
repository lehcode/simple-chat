<template>
  <aside class="w-64 border-r dark:border-slate-700 bg-white dark:bg-slate-900 flex flex-col h-full">
    <div class="p-4">
      <button
        @click="createChat"
        class="w-full flex items-center justify-center gap-2 rounded-lg border dark:border-slate-700 p-3 hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        New Chat
      </button>
    </div>
    
    <div class="flex-1 overflow-y-auto">
      <div v-for="chat in chats" :key="chat.id" class="px-2">
        <button
          @click="selectChat(chat.id)"
          class="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          :class="{ 'bg-slate-100 dark:bg-slate-800': currentChatId === chat.id }"
        >
          <div class="truncate text-sm">{{ chat.title }}</div>
          <div class="text-xs text-slate-500">
            {{ new Date(chat.updatedAt).toLocaleDateString() }}
          </div>
        </button>
      </div>
    </div>

    <div class="p-4 border-t dark:border-slate-700">
      <div class="flex flex-col gap-2">
        <label class="text-sm">
          Temperature: {{ settings.temperature }}
          <input
            type="range"
            v-model="settings.temperature"
            min="0"
            max="1"
            step="0.1"
            class="w-full"
          >
        </label>
        <label class="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            v-model="settings.streaming"
          >
          Streaming responses
        </label>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
const { chats, currentChatId, settings } = storeToRefs(chatStore)

function createChat() {
  chatStore.createChat()
}

function selectChat(id: string) {
  currentChatId.value = id
}
</script>