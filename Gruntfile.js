/*
 * grunt-mcss
 * https://github.com/NeteaseWD/grunt-mcss
 *
 * Copyright (c) 2013 leeluolee
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    mcss: {
      single_file2single_file: {
        options: {},
        files: {
          'tmp/single_file2single_file/file11.css': "test/mcss/file1.mcss"
        },
      },
      mult_file2single_folder: {
        options: {},
        files: {
          'tmp/mult_file2single_folder': ['test/mcss/file1.mcss', 'test/mcss/file2.mcss', 'test/mcss/folder1'],
        },
      },
      with_options:{
        options:{
          indent: '  ',
          format: 3,
          sourceMap: true
        },
        files: {
          'tmp/with_options/file1.css': "test/mcss/file1.mcss"
        }
      }
    },
    reset_css: function(){

    },
    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'mcss', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
