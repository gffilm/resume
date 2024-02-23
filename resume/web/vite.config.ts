// vite.config.js or vite.config.ts
export default {
  server: {
    port: 3000,
  },
  // other config options...
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  build: {
    rollupOptions: {
      input: '/src/index.tsx',
    },
  },
};
