const path = require('path');

module.exports = {
  entry: ['core-js/stable', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
          },
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    devMiddleware: {
      publicPath: '/scripts/',
    },
    open: true, // To open browser automatically after running code
    // hot: 'only',
  },
  devtool: 'source-map',
};
