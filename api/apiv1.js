const express = require('express')
const router = express.Router()
var REQUEST = require('request')

var request = REQUEST.defaults({
	strictSSL: false,
})

const WEATHER_API =
  'http://api.openweathermap.org/data/2.5/weather?appid=6b7b471967dd0851d0010cdecf28f829&units=imperial'
const COUNTRY_CODE = 'US'

const getWeatherConditions = weatherReport => {
	const weather =
    `Conditions are ${weatherReport.weather[0].main}` +
    ` and temperature is ${weatherReport.main.temp} F`
	return { city: weatherReport.name, weather: weather }
}

const checkInputZip = zipCode => {
	if (zipCode === null || typeof zipCode === 'undefined') {
		return 'zip missing'
	}
	if (zipCode.length !== 5) {
		return 'invalid zip code length'
	}
	return
}

exports.getWeather = function(req, res) {
	const zip = req.query.zip
	const errMsg = checkInputZip(zip)

	let respPayload
	let statusCode = 400

	if (errMsg) {
		return res.status(statusCode).send({ msg: errMsg })
	}

	const weatherApiQuery = `${WEATHER_API}&zip=${zip},${COUNTRY_CODE}`

	request(
		{
			method: 'GET',
			url: weatherApiQuery,
			json: true,
		},
		(err, resp, body) => {
			if (err) {
				respPayload = { msg: 'Failed to get data' }
			} else if (body.cod === 200) {
				statusCode = 200
				respPayload = getWeatherConditions(body)
			} else {
				respPayload = { msg: `No weather data for ${zip}` }
			}
			return res.status(statusCode).send(respPayload)
		}
	)
}

router.get('/getWeather', exports.getWeather)

exports.router = router
