var fs = require('fs');
var babelrc = JSON.parse(fs.readFileSync('./.babelrc'));
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('styles.css');
var webpack = require("webpack");
var path = require('path');

module.exports = {
  server : {
    entry: {
      'server': [
        './Scripts/server.js'
      ]
    },
    resolve: {
      modulesDirectories: [
        'Scripts',
        'node_modules'
      ],
      alias: {
        "superagent": path.resolve(__dirname + "/../utils/superagent-server.js"),
        "promise-window": path.resolve(__dirname + "/../utils/promise-window-server.js")
      }
    },
    module: {
      loaders: [
        { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel?' + JSON.stringify(babelrc), 'eslint']},
        { test: /\.css$/, loader: 'css/locals?module' },
        { test: /\.scss$/, loader: 'css/locals?module!sass' },
        { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'file' },
        { test: /\.(jpeg|jpeg|gif|png|tiff)$/, loader: 'file' }
      ]
    },
    output: {
      filename: '[name].generated.js',
      libraryTarget: 'this',
      path: path.resolve(__dirname + "../../../wwwroot/pack"),
      publicPath: '/pack/'
    },
    plugins: [
      new webpack.DefinePlugin({
        __CLIENT__: false,
        __SERVER__: true
      })
    ],
  },
  client: {
    entry: {
      'client': [
        'bootstrap-loader',
        './Scripts/client.js'
      ]
    },
    resolve: {
      modulesDirectories: [
        'Scripts',
        'node_modules'
      ]
    },
    module: {
      loaders: [
        { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel?' + JSON.stringify(babelrc), 'eslint']},
        { test: /\.css$/, loader: extractCSS.extract('style', 'css?modules') },
        { test: /\.scss$/, loader: extractCSS.extract('style', 'css?modules!sass') },
        { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'file' },
        { test: /\.(jpeg|jpeg|gif|png|tiff)$/, loader: 'file' }
      ]
    },
    output: {
      filename: '[name].generated.js',
      libraryTarget: 'this',
      path: path.resolve(__dirname + "../../../wwwroot/pack"),
      publicPath: '/pack/'
    },
    plugins: [
      extractCSS,
      new webpack.DefinePlugin({
        __CLIENT__: true,
        __SERVER__: false
      })
    ],
    devtool: 'source-map'
  }
}
