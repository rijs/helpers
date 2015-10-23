var expect = require('chai').expect
  , core = require('rijs.core')  
  , data = require('rijs.data')  
  , helpers = require('./')  

describe('Helpers', function(){

  it('should attach helpers, despite updating data', function(){  
    var ripple = helpers(data(core()))

    ripple('foo', { bar: 1 }, { helpers: [ help ] })
    expect(ripple('foo').help()).to.be.eql(10)
    expect(ripple('foo').help).to.be.a('function')
    expect(ripple('foo').bar).to.be.eql(1)

    ripple('foo', { bar: 2 })
    expect(ripple('foo').help).to.be.a('function')
    expect(ripple('foo').bar).to.be.eql(2)    

    function help(){ return 10 }
  })

  it('should not attach anything if not defined', function(){  
    var ripple = helpers(data(core()))

    ripple('foo', { bar: 1 }, { })
    expect(ripple('foo').String).to.not.be.a('function')
    expect(ripple('foo').bar).to.be.eql(1)
  })

})