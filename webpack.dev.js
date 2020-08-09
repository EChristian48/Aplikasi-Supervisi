const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/** @type {import ('webpack').Configuration} */
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: '/public',
    port: 9000,
  },

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
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/html/index.html' })],
}
