<template>
  <div class="h-screen flex dark:bg-slate-900">
    <ChatSidebar />
    
    <main class="flex-1 flex flex-col overflow-hidden">
      <div class="flex-1 overflow-y-auto">
        <div v-if="currentChat" class="max-w-3xl mx-auto">
          <ChatMessage
            v-for="message in currentChat.messages"
            :key="message.id"
            :message="message"
          />
        </div>
        <div v-else class="h-full flex items-center justify-center text-slate-500">
          Select or create a chat to begin
        </div>
      </div>
      
      <ChatInput @send="sendMessage" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useChatStore } from '@/stores/chat'
import ChatSidebar from '@/components/ChatSidebar.vue'
import ChatMessage from '@/components/ChatMessage.vue'
import ChatInput from '@/components/ChatInput.vue'

const chatStore = useChatStore()
const { currentChat } = storeToRefs(chatStore)

onMounted(() => {
  chatStore.loadFromStorage()
})

watch(
  () => chatStore.chats,
  () => {
    chatStore.saveToStorage()
  },
  { deep: true }
)

async function sendMessage(content: string) {
  try {
    await chatStore.sendMessage(content)
  } catch (error) {
    console.error('Failed to send message:', error)
  }
}
</script>
