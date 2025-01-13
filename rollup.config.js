import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js', // Replace with your entry file
  output: {
    file: 'dist/bundle.js',
    format: 'cjs', // or 'esm', depending on your needs
  },
  plugins: [
    commonjs({
      dynamicRequireTargets: [
        // Specify the exact files or patterns for dynamic requires
        './path/to/stopwords_en.js',
      ],
      ignoreDynamicRequires: false, // Set to true if you want Rollup to skip dynamic requires without failing
    }),
  ],
};