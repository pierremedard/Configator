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
    libraryTarget: 'commonjs'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [
          path.resolve(__dirname, "src")
        ]
      },
      {
        test: /(\.js$|\.ts(x?)$)/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'ts-loader', 
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.html', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    plugins: [
      new TsconfigPathsPlugin({ configFile: "./src/tsconfig.json" })
    ]
  },
  externals: Object.keys(require('./package.json').dependencies),
  devtool: 'source-map',
  plugins: [
    new VueLoaderPlugin()
    //new UglifyJSPlugin()
  ]
 }