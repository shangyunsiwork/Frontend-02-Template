const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // entry: './main.js',
  // entry: './main2.js',
  entry: './main3.js',
  output: {
    publicPath: '',
    path: path.join(process.cwd(), 'dist'),
    filename: '[name]_[hash:8].js',
  },
  module: {
    rules:[
      {
        test: /\.js$/,
        use: ['babel-loader']
      }
    ]
  },
  mode:'development',
  plugins: [
    new HtmlWebpackPlugin({
      inlineSource: '.css$',
      template: path.join(process.cwd(), './public/index.html'),
      // template: path.join(process.cwd(), './public/animation.html'),
      filename: 'index.html',
      inject: true,
    }),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    stats: 'errors-only',
    open: true,
    compress: true,
    progress: true,
    proxy: {
    },
  },
}