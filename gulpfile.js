'use strict';
var path = require('path');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var nsp = require('gulp-nsp');
var plumber = require('gulp-plumber');
var coveralls = require('gulp-coveralls');
var git = require('nodegit');
var rimraf = require('rimraf');

gulp.task('static', function () {
  return gulp.src('**/*.js')
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('nsp', function (cb) {
  nsp({package: path.resolve('package.json')}, cb);
});

gulp.task('pre-test', function () {
  return gulp.src('generators\**\*.js')
    .pipe(excludeGitignore())
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function (cb) {
  var mochaErr;

  gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}))
    .on('error', function (err) {
      mochaErr = err;
    })
    .pipe(istanbul.writeReports())
    .on('end', function () {
      cb(mochaErr);
    });
});

gulp.task('watch', function () {
  gulp.watch(['generators\**\*.js', 'test/**'], ['test']);
});

gulp.task('coveralls', ['test'], function () {
  if (!process.env.CI) {
    return;
  }

  return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe(coveralls());
});

gulp.task('update-templates', ['update-template-master', 'update-template-empty']);

gulp.task('update-template-master', function(cb) {
  rimraf('generators/master/templates', function() {
    var cloneOptions = new git.CloneOptions();
    cloneOptions.checkoutBranch = 'master';
    git.Clone('https://github.com/pauldotknopf/react-aspnet-boilerplate.git', 'generators/master/templates', cloneOptions)
      .then(function() {
        rimraf('generators/master/templates/.git', function() {
          cb();
        });
      });
  });
});

gulp.task('update-template-empty', function(cb) {
  rimraf('generators/empty-template/templates', function() {
    var cloneOptions = new git.CloneOptions();
    cloneOptions.checkoutBranch = 'empty-template';
    git.Clone('https://github.com/pauldotknopf/react-aspnet-boilerplate.git', 'generators/empty-template/templates', cloneOptions)
      .then(function() {
        rimraf('generators/empty-template/templates/.git', function() {
          cb();
        });
      });
  });
});

gulp.task('prepublish', ['nsp']);
gulp.task('default', ['static', 'test', 'coveralls']);
