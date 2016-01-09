'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = helpers;

var _values = require('utilise/values');

var _values2 = _interopRequireDefault(_values);

var _proxy = require('utilise/proxy');

var _proxy2 = _interopRequireDefault(_proxy);

var _keys = require('utilise/keys');

var _keys2 = _interopRequireDefault(_keys);

var _def = require('utilise/def');

var _def2 = _interopRequireDefault(_def);

var _str = require('utilise/str');

var _str2 = _interopRequireDefault(_str);

var _by = require('utilise/by');

var _by2 = _interopRequireDefault(_by);

var _is = require('utilise/is');

var _is2 = _interopRequireDefault(_is);

var _fn = require('utilise/fn');

var _fn2 = _interopRequireDefault(_fn);

/* istanbul ignore next */
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -------------------------------------------
// Attach Helper Functions for Resources
// -------------------------------------------
function helpers(ripple) {
  log('creating');

  (0, _values2.default)(ripple.types).filter((0, _by2.default)('header', 'application/data')).filter(function (type) {
    return type.parse = (0, _proxy2.default)(type.parse, attach);
  }).filter(function (type) {
    return type.to = (0, _proxy2.default)(type.to, serialise);
  });

  return ripple;
}

function attach(res) {
  var helpers = res.headers.helpers;

  (0, _keys2.default)(helpers).map(function (name) {
    return helpers[name] = (0, _fn2.default)(helpers[name]), name;
  }).map(function (name) {
    return (0, _def2.default)(res.body, name, helpers[name]);
  });

  return res;
}

function serialise(res) {
  var helpers = res.headers.helpers;

  (0, _keys2.default)(helpers).filter(function (name) {
    return _is2.default.fn(helpers[name]);
  }).map(function (name) {
    return helpers[name] = (0, _str2.default)(helpers[name]);
  });

  return res;
}

var log = require('utilise/log')('[ri/helpers]');