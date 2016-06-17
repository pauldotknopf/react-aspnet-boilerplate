"use strict";

var isProduction = process.env.NODE_ENV == 'production';
console.log('isProduction=' + isProduction);

var gulp = require('gulp');
var gutil = require('gulp-util');
var extend = require('lodash').extend;
var webpack = require('webpack');
var webpackConfig = {
  config: require("./Scripts/webpack/" + (isProduction ? "prod" : "dev") + ".config.js")
};

gulp.task('default', ['build']);
gulp.task('build', ['build-client', 'build-server']);
gulp.task('watch', ['watch-client', 'watch-server'])

// client
gulp.task('watch-client', ['build-client'], function(){
  gulp.watch(["Scripts/**/*"], ["build-client"]);
})
gulp.task('build-client-compiler', function() {
  if(!webpackConfig.clientCompiler)
    webpackConfig.clientCompiler = webpack(webpackConfig.config.client);
});
gulp.task('build-client', ['build-client-compiler'], function(cb) {
  webpackConfig.clientCompiler.run(function(err, stats) {
    if(err) throw new gutil.PluginError("build-client", err);
    gutil.log("[build-client]", stats.toString({
      colors: true,
      chunks: false
    }));
    cb();
  });
});

// server
gulp.task('watch-server', ['build-server'], function(){
  gulp.watch(["Scripts/**/*"], ["build-server"]);
})
gulp.task('build-server-compiler', function() {
  if(!webpackConfig.serverCompiler)
    webpackConfig.serverCompiler = webpack(webpackConfig.config.server);
});
gulp.task('build-server', ['build-server-compiler'], function(cb) {
  webpackConfig.serverCompiler.run(function(err, stats) {
    if(err) throw new gutil.PluginError("build-server", err);
    gutil.log("[build-server]", stats.toString({
      colors: true,
      chunks: false
    }));
    cb();
  });
});
