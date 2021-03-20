const path = require('path');
const Webpack = require('webpack');
const { merge } = require('webpack-merge');
const StylelintPlugin = require('stylelint-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  output: {
    chunkFilename: 'js/[name].chunk.js',
  },
  devServer: {
    inline: true,
    hot: true,
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new StylelintPlugin({
      files: path.join('src', '**/*.css'),
    }),
  ],
  module: {
    rules: [
      //   {
      //     test: /\.js$/,
      //     include: path.resolve(__dirname, '../src'),
      //     enforce: 'pre',
      //     loader: 'eslint-loader',
      //     options: {
      //       emitWarning: true,
      //     },
      //   },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader?sourceMap=true', 'postcss-loader'],
      },
    ],
  },
});
