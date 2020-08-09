const path = require('path')
const MinifyCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/** @type {import ('webpack').Configuration} */
module.exports = {
  mode: 'production',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },

  entry: './src/scripts/index.tsx',
  output: {
    path: path.resolve(__dirname, 'public'),
  },

  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/,
        use: [MinifyCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
    }),
    new MinifyCssExtractPlugin(),
  ],
}
