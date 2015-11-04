"use strict";

/* istanbul ignore next */
var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

// -------------------------------------------
// Attach Helper Functions for Resources
// -------------------------------------------
module.exports = helpers;

function helpers(ripple) {
  log("creating");

  values(ripple.types).filter(by("header", "application/data")).filter(function (type) {
    return type.parse = proxy(type.parse, attach);
  }).filter(function (type) {
    return type.to = proxy(type.to, serialise);
  });

  return ripple;
}

function attach(res) {
  var helpers = res.headers.helpers;

  keys(helpers).map(function (name) {
    return (helpers[name] = fn(helpers[name]), name);
  }).map(function (name) {
    return def(res.body, name, helpers[name]);
  });

  return res;
}

function serialise(res) {
  var helpers = res.headers.helpers;

  keys(helpers).filter(function (name) {
    return is.fn(helpers[name]);
  }).map(function (name) {
    return helpers[name] = str(helpers[name]);
  });

  return res;
}

var values = _interopRequire(require("utilise/values"));

var proxy = _interopRequire(require("utilise/proxy"));

var keys = _interopRequire(require("utilise/keys"));

var key = _interopRequire(require("utilise/key"));

var def = _interopRequire(require("utilise/def"));

var str = _interopRequire(require("utilise/str"));

var log = _interopRequire(require("utilise/log"));

var by = _interopRequire(require("utilise/by"));

var is = _interopRequire(require("utilise/is"));

var fn = _interopRequire(require("utilise/fn"));

log = log("[rijs/helpers]");