(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"utilise/by":2,"utilise/def":5,"utilise/key":9,"utilise/keys":10,"utilise/log":11,"utilise/proxy":13,"utilise/values":17}],2:[function(require,module,exports){
var key = require('utilise/key')
  , is  = require('utilise/is')

module.exports = function by(k, v){
  var exists = arguments.length == 1
  return function(o){
    var d = key(k)(o)
    
    return d && v && d.toLowerCase && v.toLowerCase ? d.toLowerCase() === v.toLowerCase()
         : exists ? Boolean(d)
         : is.fn(v) ? v(d)
         : d == v
  }
}
},{"utilise/is":8,"utilise/key":9}],3:[function(require,module,exports){
module.exports = typeof window != 'undefined'
},{}],4:[function(require,module,exports){
var sel = require('utilise/sel')

module.exports = function datum(node){
  return sel(node).datum()
}
},{"utilise/sel":14}],5:[function(require,module,exports){
var has = require('utilise/has')

module.exports = function def(o, p, v, w){
  !has(o, p) && Object.defineProperty(o, p, { value: v, writable: w })
  return o[p]
}

},{"utilise/has":7}],6:[function(require,module,exports){
var datum = require('utilise/datum')
  , key = require('utilise/key')

module.exports = from
from.parent = fromParent

function from(o){
  return function(k){
    return key(k)(o)
  }
}

function fromParent(k){
  return datum(this.parentNode)[k]
}
},{"utilise/datum":4,"utilise/key":9}],7:[function(require,module,exports){
module.exports = function has(o, k) {
  return k in o
}
},{}],8:[function(require,module,exports){
module.exports = is
is.fn     = isFunction
is.str    = isString
is.num    = isNumber
is.obj    = isObject
is.lit    = isLiteral
is.bol    = isBoolean
is.truthy = isTruthy
is.falsy  = isFalsy
is.arr    = isArray
is.null   = isNull
is.def    = isDef
is.in     = isIn

function is(v){
  return function(d){
    return d == v
  }
}

function isFunction(d) {
  return typeof d == 'function'
}

function isBoolean(d) {
  return typeof d == 'boolean'
}

function isString(d) {
  return typeof d == 'string'
}

function isNumber(d) {
  return typeof d == 'number'
}

function isObject(d) {
  return typeof d == 'object'
}

function isLiteral(d) {
  return typeof d == 'object' 
      && !(d instanceof Array)
}

function isTruthy(d) {
  return !!d == true
}

function isFalsy(d) {
  return !!d == false
}

function isArray(d) {
  return d instanceof Array
}

function isNull(d) {
  return d === null
}

function isDef(d) {
  return typeof d !== 'undefined'
}

function isIn(set) {
  return function(d){
    return !set ? false  
         : set.indexOf ? ~set.indexOf(d)
         : d in set
  }
}
},{}],9:[function(require,module,exports){
var is = require('utilise/is')
  , str = require('utilise/str')

module.exports = function key(k, v){ 
  var set = arguments.length > 1
    , keys = str(k).split('.')
    , root = keys.shift()

  return function deep(o){
    var masked = {}
    return !o ? undefined 
         : !k ? o
         : is.arr(k) ? (k.map(copy), masked)
         : o[k] || !keys.length ? (set ? ((o[k] = is.fn(v) ? v(o[k]) : v), o)
                                       :   o[k])
                                : (set ? (key(keys.join('.'), v)(o[root] ? o[root] : (o[root] = {})), o)
                                       : key(keys.join('.'))(o[root]))

    function copy(k){
      var val = key(k)(o)
      ;(val != undefined) && key(k, val)(masked)
    }
  }
}
},{"utilise/is":8,"utilise/str":15}],10:[function(require,module,exports){
module.exports = function keys(o) {
  return Object.keys(o || {})
}
},{}],11:[function(require,module,exports){
var is = require('utilise/is')
  , to = require('utilise/to')
  , owner = require('utilise/owner')

module.exports = function log(prefix){
  return function(d){
    if (!owner.console || !console.log.apply) return d;
    is.arr(arguments[2]) && (arguments[2] = arguments[2].length)
    var args = to.arr(arguments)
    args.unshift(prefix.grey ? prefix.grey : prefix)
    return console.log.apply(console, args), d
  }
}
},{"utilise/is":8,"utilise/owner":12,"utilise/to":16}],12:[function(require,module,exports){
(function (global){
module.exports = require('utilise/client') ? /* istanbul ignore next */ window : global
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"utilise/client":3}],13:[function(require,module,exports){
var is = require('utilise/is')

module.exports = function proxy(fn, ret, ctx){ 
  return function(){
    var result = fn.apply(ctx || this, arguments)
    return is.fn(ret) ? ret.call(ctx || this, result) : ret || result
  }
}
},{"utilise/is":8}],14:[function(require,module,exports){
module.exports = function sel(){
  return d3.select.apply(this, arguments)
}
},{}],15:[function(require,module,exports){
var is = require('utilise/is') 

module.exports = function str(d){
  return d === 0 ? '0'
       : !d ? ''
       : is.fn(d) ? '' + d
       : is.obj(d) ? JSON.stringify(d)
       : String(d)
}
},{"utilise/is":8}],16:[function(require,module,exports){
module.exports = { 
  arr: toArray
, obj: toObject
}

function toArray(d){
  return Array.prototype.slice.call(d, 0)
}

function toObject(d) {
  var by = 'id'
    , o = {}

  return arguments.length == 1 
    ? (by = d, reduce)
    : reduce.apply(this, arguments)

  function reduce(p,v,i){
    if (i === 0) p = {}
    p[v[by]] = v
    return p
  }
}
},{}],17:[function(require,module,exports){
var keys = require('utilise/keys')
  , from = require('utilise/from')

module.exports = function values(o) {
  return !o ? [] : keys(o).map(from(o))
}
},{"utilise/from":6,"utilise/keys":10}]},{},[1]);
