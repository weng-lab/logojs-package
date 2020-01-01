module.exports = {
  entry: './src/index.js',
  optimization: { usedExports: true },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js',
    library: 'logojs'  
  },
  devServer: {
    contentBase: './dist'
  }
};
