var fs = require('fs');
var babelrc = JSON.parse(fs.readFileSync('./.babelrc'));
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('styles.css');

module.exports = {
  server : {
    module: {
      loaders: [
        { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel?' + JSON.stringify(babelrc)]},
        { test: /\.css$/, loader: 'css/locals?module' },
        { test: /\.scss$/, loader: 'css/locals?module!sass' },
        { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'file' },
        { test: /\.(jpeg|jpeg|gif|png|tiff)$/, loader: 'file' }
      ]
    },
    output: {
      filename: '[name].generated.js',
      libraryTarget: 'this'
    }
  },
  client: {
    entry: {
      'client': [
        'bootstrap-loader',
        './Scripts/client.js'
      ]
    },
    module: {
      loaders: [
        { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel?' + JSON.stringify(babelrc)]},
        { test: /\.css$/, loader: extractCSS.extract('style', 'css?modules') },
        { test: /\.scss$/, loader: extractCSS.extract('style', 'css?modules!sass') },
        { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'file' },
        { test: /\.(jpeg|jpeg|gif|png|tiff)$/, loader: 'file' }
      ]
    },
    output: {
      filename: '[name].generated.js',
      libraryTarget: 'this'
    },
    plugins: [
      extractCSS
    ],
    devtool: 'source-map'
  }
}