/*
 * grunt-mcss
 * https://github.com/NeteaseWD/grunt-mcss
 *
 * Copyright (c) 2013 NeteaseWD
 * Licensed under the MIT license.
 */

'use strict';

var mcss = require('mcss');
var path = require('path');
var globule = require('globule');



module.exports = function(grunt) {

  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('mcss', 'compile MCSS to CSS', function() {

    //  仍然有效的Options有(下面列举了默认值):
    //    format: 1
    //    sourcemap: false
    //    indent: "\t"
    var done = this.async();
     
    var options = this.options;
    var self = this;
    var inputs = [];
    var promises = [];
    this.files.forEach(function(f) {
      // 代表输入输出对;
      var files = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).forEach(function(file){
        var pairs = [];
        if(grunt.file.isDir(file)){
          var dir = file, len;
          file = globule.find(path.join(file , '**/*.mcss'));
          if(file && (len=file.length)){
            for(var i=0; i < len; i++){
              pairs.push({
                input: file[i],
                // 当为folder时候 必须目标为folder
                dest: path.join(f.dest, path.relative(dir, file[i])).replace(/\.mcss$/,'.css')
              });
            }
          }
        }else{
          var dest;
          if(path.extname(f.dest) !== '.css'){//means is folder
            dest = path.join(f.dest, path.basename(file, '.mcss')) + '.css';
          }else{
            dest = f.dest;
          }
          pairs.push({
            input: file,
            dest: dest
          });
        }
        promises = promises.concat(pairs.map(function(pair){
          return mcss(
            options({
              filename: path.join(process.cwd(),pair.input), 
              dest: path.join(process.cwd(), pair.dest)
            })).translate().done(function(text){
              grunt.file.write(pair.dest, text);
          });
        }));
      });
      mcss.promise.when.apply(mcss.promise, promises).done(function(){
        
      }).fail(function(){
        var errors = {};
        for(var i =0 ;i<arguments.length;i++){
          var error = arguments[i];
          if(!errors[error.filename]){ errors[error.filename] = error;}
        }
        for(var j in errors){
          var err = errors[j];
          mcss.error.format(err);
          console.log(err.message);
        }
      }).always(function(){
        done();
      });
          

      // Handle options.
      // Write the destination file.
      // grunt.file.write(f.dest, src);

      // Print a success message.
      // grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });
};

function compile(content,options){
  options = options || {};
  return mcss(options).translate(content);
}
