"use strict";

var fs = require('fs');
var gulp = require('gulp');
var named = require('vinyl-named');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var uglify = require('gulp-uglify');
var babelrc = JSON.parse(fs.readFileSync('./.babelrc'));
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var OUTPUT_DIR = './wwwroot/';

gulp.task('default', ['build']);
gulp.task('build', ['build-server-script', 'build-client-script']);

gulp.task('build-server-script', function() {
	var extractCSS = new ExtractTextPlugin('styles.css');
	return gulp.src(['./Scripts/server.js'])
		.pipe(named())
		.pipe(webpackStream({
			module: {
				loaders: [
					{ test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel?' + JSON.stringify(babelrc)]},
					{ test: /\.css$/, loader: extractCSS.extract('style','css?modules') },
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
				// We output the styles to nothing (''),
				// because the server script doesn't need it.
				// We are essentially removing embedded styles
				// on the server script, because we don't need them.
				// The client script outputs the style to the correct
				// location and loads it into the browser correctly.
				new ExtractTextPlugin('')
			]
		}))
		.pipe(gulp.dest(OUTPUT_DIR));
});

gulp.task('build-client-script', function() {
	var extractCSS = new ExtractTextPlugin('styles.css');
	return gulp.src(['./Scripts/client.js'])
		.pipe(named())
		.pipe(webpackStream({
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
			]
		}))
		.pipe(gulp.dest(OUTPUT_DIR + 'pack/'));
});
