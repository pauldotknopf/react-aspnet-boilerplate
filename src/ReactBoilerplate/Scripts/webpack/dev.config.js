const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  server: {
    mode: 'development',
    entry: {
      server: [
        path.resolve(__dirname, '..', '..', 'Scripts', 'server.tsx')
      ]
    },
    resolve: {
      modules: [
        'Scripts',
        'node_modules'
      ],
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        superagent: path.resolve(__dirname, '..', 'utils', 'superagent-server.ts'),
        'promise-window': path.resolve(__dirname, '..', 'utils', 'promise-window-server.ts')
      }
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(t|j)sx?$/,
          exclude: /node_modules/,
          loader: 'eslint-loader'
        },
        {
          test: /\.(t|j)sx?$/,
          exclude: /node_modules/,
          loader: 'awesome-typescript-loader'
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader'
        },
        {
          test: /\.css$/,
          loader: 'css-loader/locals',
          options: {
            modules: true,
            camelCase: 'dashes'
          }
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'css-loader/locals',
              options: {
                modules: true,
                camelCase: 'dashes'
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10240
          }
        },
        {
          test: /\.(eot|ttf|wav|mp3)(\?.*)?$/,
          loader: 'file-loader'
        }
      ]
    },
    output: {
      filename: '[name].generated.js',
      libraryTarget: 'this',
      path: path.resolve(__dirname, '..', '..', 'wwwroot', 'pack'),
      publicPath: '/pack/'
    },
    plugins: [
      new webpack.DefinePlugin({
        __CLIENT__: false,
        __SERVER__: true
      }),
      new StyleLintPlugin({
        configFile: '.stylelintrc',
        failOnError: false,
        quiet: false,
        syntax: 'scss'
      })
    ]
  },
  client: {
    mode: 'development',
    entry: {
      client: [
        'babel-polyfill',
        'bootstrap-loader',
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        path.resolve(__dirname, '..', '..', 'Scripts', 'client.tsx')
      ]
    },
    resolve: {
      modules: [
        'Scripts',
        'node_modules'
      ],
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(t|j)sx?$/,
          exclude: /node_modules/,
          loader: 'eslint-loader'
        },
        {
          test: /\.(t|j)sx?$/,
          exclude: /node_modules/,
          loader: 'awesome-typescript-loader'
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader'
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'typings-for-css-modules-loader',
              options: {
                modules: true,
                namedExport: true,
                camelCase: 'dashes'
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'typings-for-css-modules-loader',
              options: {
                modules: true,
                namedExport: true,
                camelCase: 'dashes'
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10240
          }
        },
        {
          test: /\.(eot|ttf|wav|mp3)(\?.*)?$/,
          loader: 'file-loader'
        }
      ]
    },
    output: {
      filename: '[name].generated.js',
      libraryTarget: 'this',
      path: path.resolve(__dirname, '..', '..', 'wwwroot', 'pack'),
      publicPath: '/pack/'
    },
    optimization: {
      noEmitOnErrors: true
    },
    plugins: [
      new webpack.DefinePlugin({
        __CLIENT__: true,
        __SERVER__: false
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'source-map'
  }
};
