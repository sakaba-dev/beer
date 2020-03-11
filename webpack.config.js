// https://qiita.com/macotok/items/c4df30baf29ee4b9bc5e

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const AutoPrefixer = require('autoprefixer');

module.exports = [
  {
    entry: {
      app: [
        './src/js/app.js',
        './src/sass/style.scss',
      ],
    },
    output: {
      path: path.resolve(__dirname, 'docs'),
      filename: 'js/[name].js',
      publicPath: '/',
    },
    devServer: {
      contentBase: './docs',
      watchContentBase: true,
      port: 3000,
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.scss$/,
          use: [
            {loader: MiniCssExtractPlugin.loader},
            {loader: 'css-loader'},
            {loader: 'postcss-loader',
              options: {
                plugins: [ AutoPrefixer(),],
              },
            },
            {loader: 'sass-loader'}
          ],
        },
        {
          test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
          use: [
            {
              loader: 'url-loader?limit=100000&name=img/[name].[ext]',
            },
          ],
        },
      ],
    },
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin(),
        new UglifyJsPlugin(),
      ],
    },
    resolve: {
      extensions: ['.js'],
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, 'src/images/'),
          to: path.resolve(__dirname, 'docs/images/'),
        },
      ]),
      new MiniCssExtractPlugin({
        filename: 'css/style.css',
      }),
      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        pngquant: {
          quality: '95-100',
        },
      }),
    ],
  },
];