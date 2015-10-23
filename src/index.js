// -------------------------------------------
// User Management Middleware
// -------------------------------------------
export default function helpers(ripple){
  log('creating')

  values(ripple.types)
    .filter(by('header', 'application/data'))
    .map(type => type.parse = proxy(type.parse, attach))

  return ripple
}

function attach(res){
  (key('headers.helpers')(res) || [])
    .map(fn => def(res.body, fn.name, fn))

  return res
}

import values from 'utilise/values'
import proxy from 'utilise/proxy'
import key from 'utilise/key'
import def from 'utilise/def'
import log from 'utilise/log'
import by from 'utilise/by'
log = log('[rijs/helpers]')