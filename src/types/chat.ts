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

export interface ChatCompletionMessage {
  content: string
  role: Role
  tool_calls: null
  function_call: null
}

export interface ChatCompletionChoice {
  finish_reason: string
  index: number
  message: ChatCompletionMessage
}

export interface ChatCompletionUsage {
  completion_tokens: number
  prompt_tokens: number
  total_tokens: number
  completion_tokens_details: null
  prompt_tokens_details: null
}

export interface ChatCompletionResponse {
  id: string
  created: number
  model: string
  object: string
  system_fingerprint: null
  choices: ChatCompletionChoice[]
  usage: ChatCompletionUsage
}