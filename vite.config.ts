import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      // include: [
      //   'src/components/FileIcon.tsx',
      //   'src/components/FolderIcon.tsx',
      //   'src/components/IconBrowser.tsx',
      //   'src/components/MaterialIcon.tsx',
      //   'src/iconData.ts',
      //   'src/index.ts'
      // ],
      outDir: 'dist',
      rollupTypes: true
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ReactMaterialIconTheme',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        switch (format) {
          case 'es':
            return 'index.esm.js'
          case 'cjs': 
            return 'index.cjs.js'
          case 'umd':
            return 'index.umd.js'
          default:
            return `index.${format}.js`
        }
      },
    },
    // rollupOptions: {
    //   external: ['react', 'react-dom'],
    //   output: [
    //     {
    //       format: 'es',
    //       entryFileNames: 'index.esm.js',
    //     },
    //     {
    //       format: 'cjs',
    //       entryFileNames: 'index.cjs.js',
    //       exports: 'named'
    //     },
    //     {
    //       format: 'umd',
    //       entryFileNames: 'index.umd.js',
    //       name: 'ReactMaterialIconTheme',
    //       globals: {
    //         react: 'React',
    //         'react-dom': 'ReactDOM',
    //       },
    //     }
    //   ]
    // },
  },
})
