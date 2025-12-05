const { defineConfig } = require('tsup');

module.exports = defineConfig({
  entry: ['src/index.ts', 'src/browser.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
  external: ['chalk'],
});
