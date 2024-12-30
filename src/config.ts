export const config = {
  openai: {
    apiHost: import.meta.env.VITE_OPENAI_API_HOST || 'http://host.docker.internal:4000',
    apiKey: 'sk-1234'
  }
}