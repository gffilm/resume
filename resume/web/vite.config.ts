// vite.config.js or vite.config.ts
export default {
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
