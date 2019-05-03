;(() => {
  'use strict'

  const apiv1 = require('../../routes/apiv1')
  const assert = require('chai').assert
  const REQUEST = require('request')
  // const fetch = require('isomorphic-fetch')

  const request = REQUEST.defaults({
    strictSSL: false,
  })

  const appUrl = process.env.APP_URL
  const GET = 'GET'

  describe('Get Weather', () => {
    it('with valid zip code', done => {
      if (!appUrl) {
        assert.fail('Environment variable APP_URL is not defined')
        return done()
      }
      request(
        {
          method: GET,
          url: appUrl + '/api/v1/getWeather?zip=3216',
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

    it('without zip code', done => {
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

    it('with another valid zip code', done => {
      if (!appUrl) {
        assert.fail('Environment variable APP_URL is not defined')
        return done()
      }
      request(
        {
          method: GET,
          url: appUrl + '/api/v1/getWeather?zip=3189',
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

    it('with 5 character zip code', done => {
      if (!appUrl) {
        assert.fail('Environment variable APP_URL is not defined')
        return done()
      }
      request(
        {
          method: GET,
          url: appUrl + '/api/v1/getWeather?zip=78613',
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

    it('with invalid type but right length zip code', done => {
      if (!appUrl) {
        assert.fail('Environment variable APP_URL is not defined')
        return done()
      }
      request(
        {
          method: GET,
          url: appUrl + '/api/v1/getWeather?zip=abcd',
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
          url: appUrl + '/api/v1/getWeather?code=3286',
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

    // it('with invalid request types', done => {
    //   if (!appUrl) {
    //     assert.fail('Environment variable APP_URL is not defined')
    //     return done()
    //   }
    //   const err = 'ERR'
    //   const methods = ['Post', 'Put', 'Delete']
    //   let responses = new Array(methods.length)
    //   const requests = new Array()

    //   methods.map((methodType, idx) => {
    //     requests.push(
    //       request(
    //         {
    //           method: methodType,
    //           url: appUrl + '/api/v1/getWeather?code=3216',
    //         },
    //         function (err, resp, body) {
    //           if (err) {

    //           }
    //         }
    //       ),
    //     )
    //   })
    //   console.log(responses)
    //   Promise.all(requests).then(values => {
    //     let errors = []
    //     responses.map(resp => {
    //       if ('ERR' in resp) {
    //         errors.push(resp['ERR'])
    //       }
    //     })
    //     if (errors) {
    //       assert.fail(errors)
    //     }
    //   })
    //   done()
    // })
  })
})()
