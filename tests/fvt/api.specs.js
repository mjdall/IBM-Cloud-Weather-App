;(() => {
  'use strict'

  const apiv1 = require('../../api/apiv1')
  const assert = require('chai').assert
  const REQUEST = require('request')

  const request = REQUEST.defaults({
    strictSSL: false,
  })

  const appUrl = process.env.APP_URL
  const GET = 'GET'

  describe('Get Weather', () => {
    it('with valid city', done => {
      if (!appUrl) {
        assert.fail('Environment variable APP_URL is not defined')
        return done()
      }

      const city = 'Taupo'
      // console.log(appUrl + `/api/v1/getWeather?city=${city}`)
      request(
        {
          method: GET,
          url: `${appUrl}/api/v1/getWeather?city=${city}`,
        },
        function(err, resp, body) {
          if (err) {
            console.log(err)
            assert.fail('Failed to get the response')
          } else {
            assert.equal(resp.statusCode, 200)
            var pbody = JSON.parse(body)
            assert(pbody.city === city, 'City name does not match')
            done()
          }
        },
      )
    })

    it('without city', done => {
      if (!appUrl) {
        assert.fail('Environment variable APP_URL is not defined')
        return done()
      }
      request(
        {
          method: GET,
          url: appUrl + '/api/v1/getWeather',
        },
        /* @callback */ function(err, resp, body) {
          if (err) {
            assert.fail('Failed to get the response')
          } else {
            assert.equal(resp.statusCode, 400)
            done()
          }
        },
      )
    })

    it('with another valid city', done => {
      if (!appUrl) {
        assert.fail('Environment variable APP_URL is not defined')
        return done()
      }
      const city = 'Hamilton'
      request(
        {
          method: GET,
          url: `${appUrl}/api/v1/getWeather?city=${city}`,
        },
        function(err, resp, body) {
          if (err) {
            assert.fail('Failed to get the response')
          } else {
            assert.equal(resp.statusCode, 200)
            var pbody = JSON.parse(body)
            assert(pbody.city === 'Hamilton', 'City name does not match')
            done()
          }
        },
      )
    })

    it('with invalid city', done => {
      if (!appUrl) {
        assert.fail('Environment variable APP_URL is not defined')
        return done()
      }
      request(
        {
          method: GET,
          url: appUrl + '/api/v1/getWeather?city=111hamilton1111tauo',
        },
        function(err, resp, body) {
          if (err) {
            assert.fail('Failed to get the response')
          } else {
            assert.equal(resp.statusCode, 400)
            done()
          }
        },
      )
    })

    it('with invalid parameter name', done => {
      if (!appUrl) {
        assert.fail('Environment variable APP_URL is not defined')
        return done()
      }
      request(
        {
          method: GET,
          url: appUrl + '/api/v1/getWeather?district=waikato',
        },
        function(err, resp, body) {
          if (err) {
            assert.fail('Failed to get the response')
          } else {
            assert.equal(resp.statusCode, 400)
            done()
          }
        },
      )
    })
  })
})()
