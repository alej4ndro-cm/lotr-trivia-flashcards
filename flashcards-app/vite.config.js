import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/lotr-trivia-flashcards/', // Replace with your repo name
  plugins: [react()],
});