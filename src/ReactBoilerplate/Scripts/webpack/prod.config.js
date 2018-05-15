// MiniCssExtractPlugin is only used in production because it does not support HMR
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  server: {
    mode: 'production',
    entry: {
      server: [
        path.resolve(__dirname, '..', '..', 'Scripts', 'server.js')
      ]
    },
    resolve: {
      modules: [
        'Scripts',
        'node_modules'
      ],
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        superagent: path.resolve(__dirname, '..', 'utils', 'superagent-server.js'),
        'promise-window': path.resolve(__dirname, '..', 'utils', 'promise-window-server.js')
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
          loader: 'awesome-typescript-loader',
          options: {
            plugins: ['lodash']
          }
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
      new LodashModuleReplacementPlugin(),
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
    mode: 'production',
    entry: {
      client: [
        'babel-polyfill',
        path.resolve(__dirname, '..', '..', 'Scripts', 'client.js')
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
          loader: 'awesome-typescript-loader',
          options: {
            plugins: ['lodash']
          }
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
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
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
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
    plugins: [
      new LodashModuleReplacementPlugin(),
      new MiniCssExtractPlugin({ filename: 'styles.css' }),
      new webpack.DefinePlugin({
        __CLIENT__: true,
        __SERVER__: false
      })
    ]
  }
};
