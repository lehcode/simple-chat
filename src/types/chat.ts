export type Role = 'system' | 'user' | 'assistant'

export interface Message {
  id: string
  role: Role
  content: string
  timestamp: number
}

export interface Chat {
  id: string
  title: string
  messages: Message[]
  createdAt: number
  updatedAt: number
}

export interface ChatSettings {
  temperature: number
  streaming: boolean
}

export interface ChatCompletionRequest {
  model: string
  messages: Pick<Message, 'role' | 'content'>[]
  temperature: number
  stream: boolean
}