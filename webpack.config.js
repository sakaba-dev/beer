const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
      publicPath: '/',
    },
    devtool: false,
    devServer: {
      contentBase: './docs',
      watchContentBase: true,
      port: 3000,
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {loader: MiniCssExtractPlugin.loader},
            {loader: 'css-loader'},
            {loader: 'sass-loader'}
          ],
        },
      ],
    },
    plugins:[
      new MiniCssExtractPlugin({ filename: './style.css' }),
    ],
  },
];
