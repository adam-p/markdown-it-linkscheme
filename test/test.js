/*
 * Copyright Adam Pritchard 2015
 * MIT License : http://adampritchard.mit-license.org/
 */

'use strict';
/*jshint node:true*/
/* global describe, it, before, beforeEach, after, afterEach */
/*eslint-env mocha*/

var expect = require('chai').expect;

describe('markdown-it-linkscheme', function () {

  it('should not alter links that already have a scheme', function() {
    var md = require('markdown-it')().use(require('../'));
    var s, target;

    s = '[name](http://example.com)';
    target = '<p><a href="http://example.com">name</a></p>\n';
    expect(md.render(s)).to.equal(target);

    s = '[name](http://link)';
    target = '<p><a href="http://link">name</a></p>\n';
    expect(md.render(s)).to.equal(target);

    s = '[name](https://link)';
    target = '<p><a href="https://link">name</a></p>\n';
    expect(md.render(s)).to.equal(target);

    s = '[name](ftp://link)';
    target = '<p><a href="ftp://link">name</a></p>\n';
    expect(md.render(s)).to.equal(target);

    s = '[name](git+ssh://link)';
    target = '<p><a href="git+ssh://link">name</a></p>\n';
    expect(md.render(s)).to.equal(target);

    // Single forward slash
    s = '[name](other:/link)';
    target = '<p><a href="other:/link">name</a></p>\n';
    expect(md.render(s)).to.equal(target);

    // No forward slash -- like mailto:
    s = '[name](mailto:me@example.com)';
    target = '<p><a href="mailto:me@example.com">name</a></p>\n';
    expect(md.render(s)).to.equal(target);

    // Angle bracket form
    s = '<http://example.com>';
    target = '<p><a href="http://example.com">http://example.com</a></p>\n';
    expect(md.render(s)).to.equal(target);
  });

  it('should add scheme to links that do not already have one', function() {
    var md = require('markdown-it')().use(require('../'));
    var s, target;

    s = '[name](example.com)';
    target = '<p><a href="http://example.com">name</a></p>\n';
    expect(md.render(s)).to.equal(target);

    s = '[name](link)';
    target = '<p><a href="http://link">name</a></p>\n';
    expect(md.render(s)).to.equal(target);
  });

  it('should use custom scheme if provided', function() {
    var md = require('markdown-it')().use(require('../'), 'https://');
    var s, target;

    s = '[name](example.com)';
    target = '<p><a href="https://example.com">name</a></p>\n';
    expect(md.render(s)).to.equal(target);

    s = '[name](link)';
    target = '<p><a href="https://link">name</a></p>\n';
    expect(md.render(s)).to.equal(target);
  });

  it('should not add scheme to anchors (hash links)', function() {
    var md = require('markdown-it')().use(require('../'));
    var s, target;

    s = '[name](#hash)';
    target = '<p><a href="#hash">name</a></p>\n';
    expect(md.render(s)).to.equal(target);

    s = '[name](#example.com)';
    target = '<p><a href="#example.com">name</a></p>\n';
    expect(md.render(s)).to.equal(target);
  });
});
