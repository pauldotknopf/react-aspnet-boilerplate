"use strict";

var gulp = require('gulp');
var named = require('vinyl-named');
var extend = require('lodash').extend;
var webpackStream = require('webpack-stream');
var webpackConfig = {
  dev : require("./Scripts/webpack/dev.config.js"),
  prod : require("./Scripts/webpack/prod.config.js")
}
var watch = false;

var OUTPUT_DIR = './wwwroot/pack/';

gulp.task('default', ['build']);
gulp.task('build', ['build-dev']);

gulp.task('build-dev', ['build-server-script-dev', 'build-client-script-dev']);

gulp.task('build-server-script-dev', function() {
	return gulp.src(['./Scripts/server.js'])
		.pipe(named())
		.pipe(webpackStream(extend({}, webpackConfig.dev.server, {watch:watch})))
		.pipe(gulp.dest(OUTPUT_DIR));
});

gulp.task('build-client-script-dev', function() {
	return gulp.src(['./Scripts/client.js'])
		.pipe(named())
		.pipe(webpackStream(extend({}, webpackConfig.dev.client, {watch:watch})))
		.pipe(gulp.dest(OUTPUT_DIR));
});

gulp.task('build-prod', ['build-server-script-prod', 'build-client-script-prod']);

gulp.task('build-server-script-prod', function() {
  return gulp.src(['./Scripts/server.js'])
    .pipe(named())
    .pipe(webpackStream(extend({}, webpackConfig.prod.server, {watch:watch})))
    .pipe(gulp.dest(OUTPUT_DIR));
});

gulp.task('build-client-script-prod', function() {
  return gulp.src(['./Scripts/client.js'])
    .pipe(named())
    .pipe(webpackStream(extend({}, webpackConfig.prod.client, {watch:watch})))
    .pipe(gulp.dest(OUTPUT_DIR));
});

gulp.task('watch', function() {
  watch = true;
});