'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/
var fs = require('fs');
var path = require('path');
var globule = require('globule');

function extend(o1, o2, override){
  for(var i in o2){
    if(override || o1[i] == null){
      o1[i] = o2[i];
    }
  } 
  return o1;
}

function createTest(folder){
  var fullpath = path.join(__dirname, folder);
  var exsitsTest = fs.existsSync(fullpath);
  var tests = {
    check: function(test){
      test.ok(exsitsTest, folder + ' must exsits!!');
      test.done();
    }
  };
  if(!exsitsTest) {
    return tests;
  }

  var folders = fs.readdirSync(fullpath);
  folders.forEach(function( fd){
    tests[ fd] = function(test){
      var files = globule.find(path.join(fullpath, fd , '**/*.css'));
      console.log('/name/tmp/css/file.css'.replace(/tmp(\/|\\)css/, 'mcss'))
      files.forEach(function(file){
        test.equal(
          fs.readFileSync(file, 'utf8'), 
          fs.readFileSync(
            file.replace(/test(\/|\\)css/, 'tmp'), 'utf8'), 
          'should remove the long directory using clean');
      })
      test.done();
    };
  });
  return tests;
}

// createTest('css');

exports.mcss = extend({
  setUp: function(done){
    done();
  }
}, createTest('css'));

