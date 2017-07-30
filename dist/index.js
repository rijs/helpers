'use strict';

// -------------------------------------------
// Attach Helper Functions for Resources
// -------------------------------------------
module.exports = function helpers(ripple) {
  log('creating');

  var type = ripple.types['application/data'];
  type.parse = attach(type.parse);
  if (!client) type.to = serialise(type.to);
  return ripple;
};

var attach = function attach(next) {
  return function (res) {
    if (next) res = next(res);
    var helpers = res.headers.helpers;

    keys(helpers).map(function (name) {
      return helpers[name] = fn(helpers[name]), name;
    }).map(function (name) {
      return def(res.body, name, helpers[name]);
    });

    return res;
  };
};

var serialise = function serialise(next) {
  return function (req) {
    if (!req.headers) return (next || identity)(req);

    var helpers = req.headers.helpers;


    keys(helpers).filter(function (name) {
      return is.fn(helpers[name]);
    }).map(function (name) {
      return helpers[name] = str(helpers[name]);
    });

    return (next || identity)(req);
  };
};

var log = require('utilise/log')('[ri/helpers]'),
    identity = require('utilise/identity'),
    client = require('utilise/client'),
    values = require('utilise/values'),
    keys = require('utilise/keys'),
    def = require('utilise/def'),
    str = require('utilise/str'),
    by = require('utilise/by'),
    is = require('utilise/is'),
    fn = require('utilise/fn');