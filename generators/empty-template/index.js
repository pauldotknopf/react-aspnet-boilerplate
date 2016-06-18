'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var copyFromGlob = require('../../src/copyFromGlob');

module.exports = yeoman.Base.extend({

  initializing: function() {
    // if this isn't here, then the default app generator (that proxy's to this)
    // will use it's templates directory, which is non-existent.
    this.sourceRoot(path.join(__dirname, 'templates'));
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Let\'s prepare a react boilerplate using the ' + chalk.red('empty-template') + ' branch!'
    ));

    var prompts = [{
      type    : 'input',
      name    : 'projectName',
      message : 'Your project name?',
      default : 'React'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function () {

    var projectName = this.props.projectName;

    // Replace all isntances of 'ReactBoilerplate' with the provided project name.
    this.registerTransformStream(replace('ReactBoilerplate', projectName, {skipBinary: true /*don't mess with images, etc*/}));

    // Move and rename files from 'ReactBoilerplate' to the provided project name.
    this.registerTransformStream(rename(function (path) {
      path.dirname = path.dirname.replace('ReactBoilerplate', projectName);
      if(path.basename == 'ReactBoilerplate')
        path.basename = projectName;
    }));

    copyFromGlob(this ,['**/*', '**/.*', '!resources/**/*', '!LICENSE', '!README.md']);

  }

});
