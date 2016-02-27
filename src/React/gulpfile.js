"use strict";

var fs = require('fs');
var gulp = require('gulp');
var named = require('vinyl-named');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var uglify = require('gulp-uglify');
var babelrc = JSON.parse(fs.readFileSync('./.babelrc'));

var OUTPUT_DIR = './wwwroot/';

gulp.task('default', ['build']);
gulp.task('build', ['build-server-script', 'build-client-script']);

gulp.task('build-server-script', function() {
	return gulp.src(['./Scripts/server.js'])
		.pipe(named())
		.pipe(webpackStream({
			module: {
				loaders: [
					{ test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel?' + JSON.stringify(babelrc)]}
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
				new webpack.optimize.DedupePlugin()
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
					{ test: /\.json$/, loader: 'json-loader' },
					{ test: /\.less$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap' },
					{ test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap' },
					{ test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
					{ test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
					{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
					{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
					{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
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
				new webpack.optimize.DedupePlugin()
			]
		}))
		.pipe(gulp.dest(OUTPUT_DIR + 'pack/'));
});
