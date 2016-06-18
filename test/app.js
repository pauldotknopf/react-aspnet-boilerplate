'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-react-aspnet-boilerplate:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({projectName: 'TestProjectName'})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'TestProjectName.sln',
      'src/TestProjectName/TestProjectName.xproj'
    ]);
  });
});

describe('generator-react-aspnet-boilerplate:empty-template', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/empty-template'))
      .withPrompts({projectName: 'TestProjectName'})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'TestProjectName.sln',
      'src/TestProjectName/TestProjectName.xproj'
    ]);
  });
});
