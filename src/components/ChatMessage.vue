<template>
  <div :class="[
    'p-4 flex gap-4',
    message.role === 'assistant' ? 'bg-slate-100 dark:bg-slate-800' : ''
  ]">
    <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
         :class="message.role === 'assistant' ? 'bg-blue-500' : 'bg-slate-500'">
      <span class="text-white text-sm">
        {{ message.role === 'assistant' ? 'AI' : 'U' }}
      </span>
    </div>
    <div class="flex-1 prose dark:prose-invert max-w-none">
      {{ message.content }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '@/types/chat'

defineProps<{
  message: Message
}>()</script>