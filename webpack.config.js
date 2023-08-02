const middleware = require('./.backstage/middleware.js');
const path = require('path');
const globImporter = require('node-sass-glob-importer');

module.exports = {
  mode: 'development',
  entry: [
    './src/index.ts',
    './src/styles.scss',
  ],
  module: {
    rules: [
      {
        test: /\.tpl\.html$/,
        loader: 'raw-loader',
      },
      {
        test: /\.ts$/i,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: { sassOptions: { importer: globImporter() } }
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: ['svg-sprite-loader', 'svgo-loader'],
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 3000,
    static: './dist',
    historyApiFallback: {
      index: 'index.html'
    },
    client: {
      overlay: false,
    },
    setupMiddlewares: middleware,
    open: false
  },
};