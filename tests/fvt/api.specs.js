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
            assert(pbody.city === city, 'City name does not match')
            done()
          }
        },
      )
    })

    it('with valid coordinates', done => {
      if (!appUrl) {
        assert.fail('Environment variable APP_URL is not defined')
        return done()
      }

      const lat = -37.71
      const lng = 176.13
      request(
        {
          method: GET,
          url: `${appUrl}/api/v1/getWeatherWithCoords?lat=${lat}&lng=${lng}`,
        },
        function(err, resp, body) {
          if (err) {
            assert.fail('Failed to get the response')
          } else {
            assert.equal(resp.statusCode, 200)
            var pbody = JSON.parse(body)
            assert(pbody.city === 'Tauranga', 'City name does not match')
            done()
          }
        },
      )
    })

    it('with invalid coordinates', done => {
      if (!appUrl) {
        assert.fail('Environment variable APP_URL is not defined')
        return done()
      }

      const lat = 111111111
      const lng = 222222222
      request(
        {
          method: GET,
          url: `${appUrl}/api/v1/getWeatherWithCoords?lat=${lat}&lng=${lng}`,
        },
        function(err, resp, body) {
          if (err) {
            assert.fail('Failed to get the response')
          } else {
            assert.equal(resp.statusCode, 400)
            var pbody = JSON.parse(body)
            assert(
              pbody.msg === 'No weather data for 111111111 222222222',
              'Invalid response ' + pbody.msg,
            )
            done()
          }
        },
      )
    })

    it('with missing coordinates', done => {
      if (!appUrl) {
        assert.fail('Environment variable APP_URL is not defined')
        return done()
      }

      request(
        {
          method: GET,
          url: `${appUrl}/api/v1/getWeatherWithCoords`,
        },
        function(err, resp, body) {
          if (err) {
            assert.fail('Failed to get the response')
          } else {
            assert.equal(resp.statusCode, 400)
            var pbody = JSON.parse(body)
            assert(
              pbody.msg === 'no "lat" and/or "lng" provided',
              'City name does not match',
            )
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

    it('check input fields persistence', done => {
      if (!appUrl) {
        assert.fail('Environment variable APP_URL is not defined')
        return done()
      }
      // send valid requests that will be inserted into db
      const cityList = ['Hamilton', 'Taupo', 'Rotorua', 'Tauranga']
      cityList.map((city, idx) => {
        request(
          {
            method: GET,
            url: appUrl + `/api/v1/getWeather?city=${city}&input=${idx}`,
          },
          function(err, resp, body) {
            if (err) {
              assert.fail('Failed to get the response')
            } else {
              assert.equal(resp.statusCode, 200)
            }
          },
        )
      })
      // make sure the requests are now the latest fields
      request(
        {
          method: GET,
          url: appUrl + `/api/v1/getInputFields`,
        },
        function(err, resp, body) {
          if (err) {
            assert.fail('Failed to get the response')
          } else {
            assert.equal(resp.statusCode, 200)
            const cities = JSON.parse(body)
            cityList.map((city, idx) => {
              const foundResults = cities[idx.toString()]
              assert(
                foundResults.city === city,
                `invalid city, "${foundResults.city}" expected "${city}"`,
              )
            })
            done()
          }
        },
      )
    })
  })
})()
