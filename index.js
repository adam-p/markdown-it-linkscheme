/*
 * Copyright Adam Pritchard 2015
 * MIT License : http://adampritchard.mit-license.org/
 */

'use strict';
/*jshint node:true*/


// From http://en.wikipedia.org/wiki/URI_scheme
// The scheme name consists of a sequence of characters beginning with a letter
// and followed by any combination of letters, digits, plus ("+"), period ("."),
// or hyphen ("-"). Although schemes are case-insensitive, the canonical form is
// lowercase and documents that specify schemes must do so with lowercase letters.
// The scheme name is followed by a colon (":").
var hasSchemeRegex = /^([a-zA-Z0-9+.-]+:|#).+/;

module.exports = function linkscheme_plugin(md, scheme) {
  var oldLinkOpenOverride = md.renderer.rules.link_open;

  scheme = scheme || 'http://';

  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    var hrefIndex = tokens[idx].attrIndex('href');

    if (hrefIndex >= 0 &&
        !hasSchemeRegex.test(tokens[idx].attrs[hrefIndex][1])) {
      tokens[idx].attrs[hrefIndex][1] = scheme + tokens[idx].attrs[hrefIndex][1];
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
