# grunt-mcss

> compile MCSS to CSS

## Getting Started
This plugin requires Grunt `~0.4.1`


```shell
npm install grunt-mcss --save-dev
```
or in your package.json"s dependencies field add `"grunt-mcss": "{version}"`

then it must be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-mcss');
```

## The "mcss" task

### Overview
In your project's Gruntfile, add a section named `mcss` to the data object passed into `grunt.initConfig()`.

```js
// add mcss config in gruntfile
grunt.initConfig({
  mcss: {
    options: {
      indent: '' //default "\t" [optional]
      format: 3  //defualt 1 
    },
    files: {
      // Target-specific file lists and/or options go here.
    },
  },
})

// load npm grunt-mcss task , make sure that grunt-mcss has already installed locally
grunt.loadNpmTasks('grunt-mcss');

```


### Options

options below is supported

1. indent     [optional] default __`\t`__;
2. sourceMap  [optional] default __false__;
3. format     [optional] default 1(1: no compressed, 2: compressed, 3: one line mode);


### Usage Examples


```js
grunt.initConfig({
  mcss: {
    options: {
      format: 3,
    },
    files: {
      'dest/css': ['src/mcss', 'src2/mcss'],
      'dest2/file1.css': "mcss/file2.mcss"

    },
  },
})
```

## contribute

please make sure that the test is passed (in `grunt-mcss` project's root, type `grunt`) before pulling request;


## LICENSE
Copyright (c) 2013 NetEaseWD and grunt-mcss contributor

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
