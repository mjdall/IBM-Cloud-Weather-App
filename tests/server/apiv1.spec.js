;(function() {
  'use strict'

  var requireHelper = require('./requireHelper')
  var apiv1 = requireHelper.require('tests/coverage/instrumented/api/apiv1')
  var assert = require('chai').assert
  var sinon = require('sinon')

  // create mock request and response
  var reqMock = {}

  var resMock = {}
  resMock.status = function() {
    return this
  }
  resMock.send = function() {
    return this
  }
  resMock.end = function() {
    return this
  }
  sinon.spy(resMock, 'status')
  sinon.spy(resMock, 'send')

  describe('Get Weather', function() {
    it('without city', function() {
      reqMock = {
        query: {},
      }

      apiv1.getWeather(reqMock, resMock)
      assert(
        resMock.status.lastCall.calledWith(400),
        'Unexpected status code:' + resMock.status.lastCall.args
      )
    })

    it('with valid city and error from request call', function() {
      reqMock = {
        query: {
          city: 'Hamilton',
        },
      }

      var request = function(obj, callback) {
        callback('error', null, null)
      }

      apiv1.__set__('request', request)

      apiv1.getWeather(reqMock, resMock)

      assert(
        resMock.status.lastCall.calledWith(400),
        'Unexpected response:' + resMock.status.lastCall.args
      )
      assert(
        resMock.send.lastCall.calledWith({ msg: 'Failed to get data' }),
        'Unexpected response:' + resMock.send.lastCall.args
      )
    })

    it('with incomplete city', function() {
      reqMock = {
        query: {
          city: 'Hamilto',
        },
      }

      var request = function(obj, callback) {
        callback(null, null, {})
      }

      apiv1.__set__('request', request)

      apiv1.getWeather(reqMock, resMock)

      assert(
        resMock.status.lastCall.calledWith(400),
        'Unexpected response:' + resMock.status.lastCall.args
      )
      assert(
        resMock.send.lastCall.args[0].msg === 'No weather data for Hamilto',
        'Unexpected response:' + resMock.send.lastCall.args
      )
    })

    it('with valid city', function() {
      reqMock = {
        query: {
          city: 'Hamilton',
        },
      }

      var body = {
        cod: 200,
        name: 'Hamilton',
        weather: [
          {
            main: 'cold',
          },
        ],
        main: {
          temp: 78,
        },
      }

      var request = function(obj, callback) {
        callback(null, null, body)
      }

      apiv1.__set__('request', request)

      apiv1.getWeather(reqMock, resMock)

      assert(
        resMock.status.lastCall.calledWith(200),
        'Unexpected response:' + resMock.status.lastCall.args)
      assert(
        resMock.send.lastCall.args[0].city === 'Hamilton',
        'Unexpected response:' + resMock.send.lastCall.args[0].city,
      )
      assert(
        resMock.send.lastCall.args[0].weather ===
          'Conditions are cold and temperature is 78 C',
        'Unexpected response:' + resMock.send.lastCall.args[0].weather,
      )
    })
  })
})()
