import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        landing: 'landing.html',
        quiz: 'quiz.html'
      }
    }
  }
});
