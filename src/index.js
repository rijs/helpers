// -------------------------------------------
// Attach Helper Functions for Resources
// -------------------------------------------
module.exports = function helpers(ripple){
  log('creating')

  const type = ripple.types['application/data']
  type.parse = attach(type.parse)
  if (!client) type.to = serialise(type.to)
  return ripple
}

const attach = next => res => {
  if (next) res = next(res)
  const helpers = res.headers.helpers

  keys(helpers)
    .map(name => (helpers[name] = fn(helpers[name]), name))
    .map(name => def(res.body, name, helpers[name]))

  return res
}

const serialise = next => req => {
  if (!req.headers) return (next || identity)(req)

  const { helpers } = req.headers

  keys(helpers)
    .filter(name => is.fn(helpers[name]))
    .map(name => helpers[name] = str(helpers[name]))

  return (next || identity)(req)
}

const log = require('utilise/log')('[ri/helpers]')
    , identity = require('utilise/identity')
    , client = require('utilise/client')
    , values = require('utilise/values')
    , keys = require('utilise/keys')
    , def = require('utilise/def')
    , str = require('utilise/str')
    , by = require('utilise/by')
    , is = require('utilise/is')
    , fn = require('utilise/fn')