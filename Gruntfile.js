/*global module:false*/
module.exports = function (grunt) {
  var sourceFiles = ['confirm-click.js', 'click-app.js'];
  var testPages = ['index.html'];

  grunt.initConfig({

    filenames: {
      options: {
        valid: 'dashes'
      },
      src: sourceFiles
    },

    jshint: {
      all: sourceFiles,
      options: {
        jshintrc: 'configs/jshint.json',
        reporter: require('jshint-summary')
      }
    },

    eslint: {
      target: sourceFiles,
      options: {
        config: 'configs/eslint.json',
        rulesdir: ['./node_modules/eslint-rules']
      }
    },

    jscs: {
      src: sourceFiles,
      options: {
        config: 'configs/jscs.json'
      }
    },

    'clean-console': {
      test: {
        options: {
          url: testPages,
          timeout: 1 // seconds to wait for any errors
        }
      }
    },

    'gh-pages': {
      options: {
        base: '.'
      },
      src: [
        'README.md',
        'confirm-click.js',
        'index.html',
        'node_modules/es5-shim/es5-shim.js',
        'node_modules/console-log-div/console-log-div.js',
        'node_modules/ng-alertify/ng-alertify.js',
        'bower_components/angular/angular.js',
        'alertify/*'
      ]
    }
  });

  var plugins = module.require('matchdep').filterDev('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  grunt.registerTask('lint', ['filenames', 'jshint', 'eslint', 'jscs']);
  grunt.registerTask('test', ['clean-console']);
  grunt.registerTask('default', ['deps-ok', 'nice-package', 'lint', 'test']);
};
