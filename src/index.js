// -------------------------------------------
// Attach Helper Functions for Resources
// -------------------------------------------
export default function helpers(ripple){
  log('creating')

  values(ripple.types)
    .filter(by('header', 'application/data'))
    .filter(type => type.parse = proxy(type.parse, attach))
    .filter(type => type.to = proxy(type.to, serialise))

  return ripple
}

function attach(res){
  var helpers = res.headers.helpers

  keys(helpers)
    .map(name => (helpers[name] = fn(helpers[name]), name))
    .map(name => def(res.body, name, helpers[name]))

  return res
}

function serialise(res) {
  var helpers = res.headers.helpers

  keys(helpers)
    .filter(name => is.fn(helpers[name]))
    .map(name => helpers[name] = str(helpers[name]))

  return res
}

const log = require('utilise/log')('[ri/helpers]')
import values from 'utilise/values'
import proxy from 'utilise/proxy'
import keys from 'utilise/keys'
import def from 'utilise/def'
import str from 'utilise/str'
import by from 'utilise/by'
import is from 'utilise/is'
import fn from 'utilise/fn'