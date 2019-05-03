const express = require('express')
const router = express.Router()
const fetch = require('isomorphic-fetch')

const WEATHER_API =
  'http://api.openweathermap.org/data/2.5/weather?appid=6b7b471967dd0851d0010cdecf28f829&units=imperial'
const COUNTRY_CODE = 'US'

getWeatherConditions = weatherReport => {
  const weather =
    `Conditions are ${weatherReport.weather[0].main}` +
    ` and temperature is ${weatherReport.main.temp} F`
  city = weatherReport.name
  return { city: weatherReport.name, weather: weather }
}

checkInputZip = zipCode => {
  if (zipCode === null || typeof zipCode === 'undefined') {
    return 'zip missing'
  }
  if (zipCode.length !== 5) {
    return 'invalid zip code length'
  }
  return
}

exports.getWeather = async function(req, res) {
  const zip = req.query.zip
  const errMsg = checkInputZip(zip)

  let respPayload = { msg: 'Failed' }
  let statusCode = 400

  if (errMsg) {
    return res.status(statusCode).send({ msg: errMsg })
  }

  const weatherApiQuery = `${WEATHER_API}&zip=${zip},${COUNTRY_CODE}`
  await fetch(weatherApiQuery)
    .then(response => {
      if (response.status / 100 === 2) {
        return response.json()
      }
    })
    .then(weatherReport => {
      statusCode = 200
      respPayload = getWeatherConditions(weatherReport)
    })
    .catch(_ => {
      respPayload = { msg: `No weather data for ${zip}` }
      statusCode = 501
    })
  return res.status(statusCode).send(respPayload)
}

router.get('/getWeather', exports.getWeather)

exports.router = router
