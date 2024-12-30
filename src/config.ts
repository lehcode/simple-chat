export const config = {
  openai: {
    apiHost: import.meta.env.VITE_OPENAI_API_HOST || 'http://host.docker.internal:4000',
    apiKey: 'sk-1234',
    model: import.meta.env.VITE_OPENAI_MODEL || 'llama-3.1',
    temperature: import.meta.env.VITE_OPENAI_TEMPERATURE ? parseFloat(import.meta.env.VITE_OPENAI_TEMPERATURE) : 0.5,
    stream: import.meta.env.VITE_OPENAI_STREAM ? import.meta.env.VITE_OPENAI_STREAM === 'true' : false
  }
}