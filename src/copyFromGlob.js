
var path = require('path');
var globby = require("globby");
var fs = require('fs');

module.exports = function(generator, paths) {
  var sourceRoot = path.resolve(generator.sourceRoot());
  paths = typeof paths === 'string' ? [paths] : paths;
  paths = paths.map(function(_path) {
    if(_path.startsWith('!'))
      return '!' + path.join(sourceRoot, _path.substring(1));
    return path.join(sourceRoot, _path);
  });
  var files = globby.sync(paths).filter(function(elem, pos) {
    return fs.statSync(elem).isFile();
  });
  var uniqueFiles = files.filter(function(elem, pos) {
    return files.indexOf(elem) == pos;
  });
  console.log(uniqueFiles);
  uniqueFiles.forEach(function(filename) {
    filename = path.resolve(filename);
    console.log(filename.replace(sourceRoot, '').substring(1));
    generator.fs.copy(filename, filename.replace(sourceRoot, '').substring(1));
  });
}
