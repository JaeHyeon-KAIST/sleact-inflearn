const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  name: 'sleact',
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'hidden-source-map' : 'eval',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@hooks': path.resolve(__dirname, 'hooks'),
      '@components': path.resolve(__dirname, 'components'),
      '@layouts': path.resolve(__dirname, 'layouts'),
      '@pages': path.resolve(__dirname, 'pages'),
      '@utils': path.resolve(__dirname, 'utils'),
      '@typings': path.resolve(__dirname, 'typings'),
    },
  },
  entry: {
    app: './client',
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].min.js',
  },
  devServer: {
    static: { directory: path.resolve(__dirname) },
    hot: true,
    port: 8084,
    allowedHosts: 'all',
    host: '0.0.0.0',
    client: {
      webSocketURL: 'ws://0.0.0.0/npm/ws',
    },
    liveReload: false,
    historyApiFallback: true,
  },
  watchOptions: {
    ignored: ['**/node_modules', '**/dist'],
  },
  optimization: {
    minimizer: !isDevelopment
      ? [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,
              },
            },
            extractComments: false,
          }),
        ]
      : [],
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { browsers: ['> 5% in KR', 'last 2 chrome versions'] },
                debug: isDevelopment,
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          env: {
            development: {
              plugins: [['@emotion/babel-plugin', { sourceMap: true }], require.resolve('react-refresh/babel')],
            },
            production: {},
          },
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|gif|png|svg|ico)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    !isDevelopment && new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: isDevelopment
        ? false
        : {
            collapseWhitespace: true,
            removeComments: true,
          },
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      // eslint: {
      //   files: "./src/**/*",
      // },
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './public/slack-data', to: './slack-data' },
      ],
    }),
    new webpack.EnvironmentPlugin({ NODE_ENV: isDevelopment ? 'development' : 'production' }),
  ].filter(Boolean),
};
