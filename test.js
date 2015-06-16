var assert = require('assert')
var cloneDeep = require('lodash.clonedeep')
var ospath = require('./')

/* global describe it afterEach beforeEach */

describe('ospath', function () {
  var env

  beforeEach(function () {
    env = cloneDeep(process.env)
  })

  afterEach(function () {
    process.env = env
  })

  describe('data', function () {
    describe('> when linux', function () {
      it('should return a string value', function () {
        ospath.__platform = 'linux'
        process.env.HOME = '/some/linux/home'
        delete process.env.XDG_CONFIG_HOME
        assert.equal(ospath.data(), '/some/linux/home/.config')
      })

      describe('> when XDG_CONFIG_HOME is set', function () {
        it('should return a string value', function () {
          ospath.__platform = 'linux'
          process.env.HOME = '/some/linux/home'
          process.env.XDG_CONFIG_HOME = '/tmp/config'
          assert.equal(ospath.data(), '/tmp/config')
        })
      })
    })

    describe('> when darwin', function () {
      it('should return a string value', function () {
        ospath.__platform = 'darwin'
        process.env.HOME = '/some/darwin/home'
        assert.equal(ospath.data(), '/some/darwin/home/Library/Application Support')
      })
    })

    describe('> when win32', function () {
      it('should return a string value', function () {
        ospath.__platform = 'win32'
        // windows specific
        process.env.APPDATA = '/some/win32/appdata'
        assert.equal(ospath.data(), '/some/win32/appdata')
      })
    })
  })

  describe('home', function () {
    describe('> when linux', function () {
      it('should return a string value', function () {
        ospath.__platform = 'linux'
        process.env.HOME = '/some/linux/home'
        assert.equal(ospath.home(), '/some/linux/home')
      })
    })

    describe('> when darwin', function () {
      it('should return a string value', function () {
        ospath.__platform = 'darwin'
        process.env.HOME = '/some/darwin/home'
        assert.equal(ospath.home(), '/some/darwin/home')
      })
    })

    describe('> when win32', function () {
      it('should return a string value', function () {
        ospath.__platform = 'win32'
        // windows specific
        process.env.USERPROFILE = '/some/win32/home'
        assert.equal(ospath.home(), '/some/win32/home')
      })
    })
  })

  describe('tmp', function () {
    describe('> when linux', function () {
      it('should return a string value', function () {
        ospath.__platform = 'linux'
        assert.equal(ospath.tmp(), '/tmp')
      })
    })

    describe('> when darwin', function () {
      it('should return a string value', function () {
        ospath.__platform = 'darwin'
        assert.equal(ospath.tmp(), '/tmp')
      })
    })

    describe('> when win32', function () {
      it('should return a string value', function () {
        ospath.__platform = 'win32'
        // windows specific
        process.env.TEMP = '/some/temp/path/on/windows'
        assert.equal(ospath.tmp(), '/some/temp/path/on/windows')
      })
    })
  })
})
