import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Chat, Message, ChatSettings, ChatCompletionRequest, ChatCompletionResponse } from '@/types/chat'
import { config } from '@/config'

const API_URL = `${config.openai.apiHost}/chat/completions`
const API_KEY = config.openai.apiKey

export const useChatStore = defineStore('chat', () => {
  const chats = ref<Chat[]>([])
  const currentChatId = ref<string | null>(null)
  const settings = ref<ChatSettings>({
    temperature: 0.7,
    streaming: true
  })

  const currentChat = computed(() => 
    chats.value.find(chat => chat.id === currentChatId.value)
  )

  function createChat() {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    chats.value.push(newChat)
    currentChatId.value = newChat.id
    return newChat
  }

  async function sendMessage(content: string) {
    if (!currentChat.value) {
      createChat()
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: Date.now()
    }

    currentChat.value?.messages.push(userMessage)
    
    try {
      const messages = currentChat.value?.messages.map(({ role, content }) => ({ role, content })) || []
      const request: ChatCompletionRequest = {
        model: config.openai.model,
        messages,
        temperature: config.openai.temperature,
        stream: config.openai.stream
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify(request)
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      if (settings.value.streaming) {
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        let content = ''

        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: '',
          timestamp: Date.now()
        }
        currentChat.value?.messages.push(assistantMessage)

        while (reader) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          content += chunk
          assistantMessage.content = content
        }
      } else {
        const data: ChatCompletionResponse = await response.json()
        const assistantMessage: Message = {
          id: data.id,
          role: data.choices[0].message.role,
          content: data.choices[0].message.content,
          timestamp: data.created * 1000 // Convert Unix timestamp from seconds to milliseconds
        }
        currentChat.value?.messages.push(assistantMessage)
      }

      if (currentChat.value) {
        currentChat.value.updatedAt = Date.now()
        if (currentChat.value.messages.length === 2) {
          currentChat.value.title = currentChat.value.messages[0].content.slice(0, 50)
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)
      throw error
    }
  }

  function loadFromStorage() {
    const storedChats = localStorage.getItem('chats')
    if (storedChats) {
      chats.value = JSON.parse(storedChats)
    }
    const storedCurrentChatId = localStorage.getItem('currentChatId')
    if (storedCurrentChatId) {
      currentChatId.value = storedCurrentChatId
    }
  }

  function saveToStorage() {
    localStorage.setItem('chats', JSON.stringify(chats.value))
    if (currentChatId.value) {
      localStorage.setItem('currentChatId', currentChatId.value)
    }
  }

  return {
    chats,
    currentChatId,
    currentChat,
    settings,
    createChat,
    sendMessage,
    loadFromStorage,
    saveToStorage
  }
})