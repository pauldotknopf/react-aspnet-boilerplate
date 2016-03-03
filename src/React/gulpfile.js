"use strict";


var gulp = require('gulp');
var named = require('vinyl-named');
var webpackStream = require('webpack-stream');
var webpackConfig = require("./Scripts/webpack/dev.config.js");

var OUTPUT_DIR = './wwwroot/pack/';

gulp.task('default', ['build']);
gulp.task('build', ['build-server-script', 'build-client-script']);

gulp.task('build-server-script', function() {
	return gulp.src(['./Scripts/server.js'])
		.pipe(named())
		.pipe(webpackStream(webpackConfig.server))
		.pipe(gulp.dest(OUTPUT_DIR));
});

gulp.task('build-client-script', function() {
	return gulp.src(['./Scripts/client.js'])
		.pipe(named())
		.pipe(webpackStream(webpackConfig.client))
		.pipe(gulp.dest(OUTPUT_DIR));
});
