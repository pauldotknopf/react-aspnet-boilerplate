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
	return gulp.src(['./Scripts/server.js'])
		.pipe(named())
		.pipe(webpackStream({
			module: {
				loaders: [
					{ test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel?' + JSON.stringify(babelrc)]},
					{ test: /\.css$/, loaders: [ 'style', 'css' ] },
					{ test: /\.scss$/, loaders: [ 'style', 'css', 'sass' ] },
					{ test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' },
					{ test: /\.png$/, loader: "url-loader" }
				]
			},
			output: {
				filename: '[name].generated.js',
				libraryTarget: 'this'
			},
			plugins: [
				new webpack.DefinePlugin({
					'process.env.NODE_ENV': '"development"'
				}),
				new webpack.optimize.OccurenceOrderPlugin(),
				new webpack.optimize.DedupePlugin(),
				new ExtractTextPlugin("styles.css")
			]
		}))
		.pipe(gulp.dest(OUTPUT_DIR));
});

gulp.task('build-client-script', function() {
	return gulp.src(['./Scripts/client.js'])
		.pipe(named())
		.pipe(webpackStream({
			module: {
				loaders: [
					{ test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel?' + JSON.stringify(babelrc)]},
					{ test: /\.css$/, loaders: [ 'style', 'css' ] },
					{ test: /\.scss$/, loaders: [ 'style', 'css', 'sass' ] },
					{ test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' },
					{ test: /\.png$/, loader: "url-loader" }
				]
			},
			output: {
				filename: '[name].generated.js',
				libraryTarget: 'this'
			},
			plugins: [
				new webpack.DefinePlugin({
					'process.env.NODE_ENV': '"development"'
				}),
				new webpack.optimize.OccurenceOrderPlugin(),
				new webpack.optimize.DedupePlugin(),
				new ExtractTextPlugin("styles.css")
			]
		}))
		.pipe(gulp.dest(OUTPUT_DIR + 'pack/'));
});
