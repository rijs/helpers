// -------------------------------------------
// Attach Helper Functions for Resources
// -------------------------------------------
export default function helpers(ripple){
  log('creating')

  values(ripple.types)
    .filter(by('header', 'application/data'))
    .map(type => type.parse = proxy(type.parse, attach))

  return ripple
}

function attach(res){
  var helpers = key('headers.helpers')(res)

  keys(helpers)
    .map(name => def(res.body, name, helpers[name]))

  return res
}

import values from 'utilise/values'
import proxy from 'utilise/proxy'
import keys from 'utilise/keys'
import key from 'utilise/key'
import def from 'utilise/def'
import log from 'utilise/log'
import by from 'utilise/by'
log = log('[rijs/helpers]')