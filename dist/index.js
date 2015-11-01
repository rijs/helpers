"use strict";

/* istanbul ignore next */
var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

// -------------------------------------------
// Attach Helper Functions for Resources
// -------------------------------------------
module.exports = helpers;

function helpers(ripple) {
  log("creating");

  values(ripple.types).filter(by("header", "application/data")).map(function (type) {
    return type.parse = proxy(type.parse, attach);
  });

  return ripple;
}

function attach(res) {
  var helpers = key("headers.helpers")(res);

  keys(helpers).map(function (name) {
    return def(res.body, name, helpers[name]);
  });

  return res;
}

var values = _interopRequire(require("utilise/values"));

var proxy = _interopRequire(require("utilise/proxy"));

var keys = _interopRequire(require("utilise/keys"));

var key = _interopRequire(require("utilise/key"));

var def = _interopRequire(require("utilise/def"));

var log = _interopRequire(require("utilise/log"));

var by = _interopRequire(require("utilise/by"));

log = log("[rijs/helpers]");