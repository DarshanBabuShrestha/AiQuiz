import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Allows access from any device in the network
    port: 5173,       // Keep this port
    strictPort: true,
    hmr: {
      clientPort: 5173, // Ensures hot module reload works
    }
  },
});
