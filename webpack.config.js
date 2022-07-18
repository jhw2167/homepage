const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', './index.tsx'),
  

  module: { 
    rules: [ 
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { 
      exclude: ['/(node_modules)/', '/*/*.css', '/*/*.svg'],
      test: /\.tsx?$/, 
      loader: "ts-loader" 
    }
  ]
},

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json','.ts', '.tsx'],
    alias: {
      Components: path.resolve(__dirname, 'src/main/components/'),
      Assets: path.resolve(__dirname, 'src/assets/'),
      Pages: path.resolve(__dirname, 'src/main/pages/'),
      Resources: path.resolve(__dirname, 'src/resources/'),
      CSS: path.resolve(__dirname, 'src/css/')
    }
  }
}