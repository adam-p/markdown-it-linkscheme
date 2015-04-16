/*
 * Copyright Adam Pritchard 2015
 * MIT License : http://adampritchard.mit-license.org/
 */

'use strict';
/*jshint node:true*/


module.exports = function linkscheme_plugin(md, opts) {
  var oldLinkOpenOverride = md.renderer.rules.link_open;

  opts = opts || {};

  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    var hrefIndex = tokens[idx].attrIndex('href');

    if (hrefIndex >= 0) {
      //tokens[idx].attrs[hrefIndex][1] = 'http://' + tokens[idx].attrs[hrefIndex][1];
    }

    if (oldLinkOpenOverride) {
      return oldLinkOpenOverride.apply(self, arguments);
    }
    else {
      // There was no previous renderer override. Just call the default.
      return self.renderToken.apply(self, arguments);
    }
  };
};
