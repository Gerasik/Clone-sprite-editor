const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/App.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: { name: 'gif.worker.js' },
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader?name=./fonts/fontawesome/[name].[ext]',
          },
        ],
      },
      {
        test: /\.(gif|jpeg|png)$/,
        use: [
          {
            loader: 'file-loader?name=./img/[name].[ext]',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ title: 'Piskel clone' }),
    new ExtractTextPlugin({ filename: 'style.css' }), // Create empty HTML
  ],
};
