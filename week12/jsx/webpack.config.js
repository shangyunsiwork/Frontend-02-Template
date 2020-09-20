module.exports = {
  entry: './main.js',
  module: {
    rules:[
      {
        test: /\.js$/,
        use: ['babel-loader']
      }
    ]
  },
  mode:'development',
}