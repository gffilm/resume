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
    outDir: 'dist', // This is the default output directory
    assetsDir: '.', // This is important to have assets in the root of outDir
    emptyOutDir: true, // Clear the output directory before each build

    rollupOptions: {
      input: '/index.html',
    },
  },
};
