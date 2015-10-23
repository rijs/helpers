# Ripple | Helpers
[![Coverage Status](https://coveralls.io/repos/rijs/helpers/badge.svg?branch=master&service=github)](https://coveralls.io/github/rijs/helpers?branch=master)
[![Build Status](https://travis-ci.org/rijs/helpers.svg)](https://travis-ci.org/rijs/helpers)

Registers helper functions for a resource:

```js
export default {
  name: 'foo'
, body: { bar: 1 }  
, headers: { helpers: [ help ] }
}

function help(){ return 'help!' }
```

You will be able to access the helper functions from the resource itself, even if you overwrite the entire resource body:

```js
ripple('foo').help()

ripple('foo', { bar: 2 })

ripple('foo').help()
```
