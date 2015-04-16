'use strict';
/*jshint node:true*/
/*globals describe*/
/*eslint-env mocha*/


var path     = require('path');
var generate = require('markdown-it-testgen');

describe('markdown-it-linkscheme', function () {
  var md = require('markdown-it')()
              .use(require('../'));

  generate(path.join(__dirname, 'fixtures/linkscheme.txt'), md);
});
