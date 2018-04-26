const path = require('path');
const webpack = require('webpack');

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app_auth_js: './app_auth_js.js'
  },
  output: {
    filename: 'app_auth_js.js',
    library: 'AppAuthJs',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'www')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
}

module.exports = config;
