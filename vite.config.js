// vite.config.js
import { defineConfig } from 'vite';
import { glob } from 'glob';
import path from 'path';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => ({
  root: 'src',

  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      // glob.sync найдёт src/index.html, src/1-gallery.html, src/2-form.html и т.д.
      input: glob.sync('src/*.html').reduce((entries, file) => {
        const name = path.basename(file, '.html');
        // entries = { index: '/абсолютный/путь/к/src/index.html', gallery: '…', form: '…' }
        entries[name] = path.resolve(__dirname, file);
        return entries;
      }, {}),
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },

  plugins: [
    // 1) Подставляем ваши partials (header.html, back-link.html, footer.html)
    injectHTML(),

    // 2) FullReload для мгновенной перезагрузки при изменении любых HTML
    FullReload(['src/**/*.html']),
  ],

  css: {
    postcss: {
      // 3) Сортируем медиа-запросы «mobile-first»
      plugins: [SortCss({ sort: 'mobile-first' })],
    },
  },
}));
