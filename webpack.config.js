const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './static'),
    publicPath: '/static/',
    filename: 'build.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader', 
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    plugins: [
      new TsconfigPathsPlugin({ configFile: "./src/tsconfig.json" })
    ]
  },
  devtool: '#eval-source-map',
  plugins: [
    new VueLoaderPlugin(),
    new UglifyJSPlugin()
  ]
 }