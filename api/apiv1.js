const express = require('express')
const router = express.Router()
var REQUEST = require('request')

var request = REQUEST.defaults({
	strictSSL: false,
})

const WEATHER_API =
  'http://api.openweathermap.org/data/2.5/weather?appid=6b7b471967dd0851d0010cdecf28f829&units=metric'
const COUNTRY_CODE = 'NZ'

const getWeatherConditions = weatherReport => {
	const weather =
    `Conditions are ${weatherReport.weather[0].main}` +
    ` and temperature is ${weatherReport.main.temp} C`
	return {
		city: weatherReport.name,
		weather: weather,
		lng: weatherReport.coord.lon,
		lat: weatherReport.coord.lat,
	}
}

const sendApiRequest = (res, weatherApiQuery, failureMsg) => {
	let respPayload
	let statusCode = 400
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
				respPayload = { msg: failureMsg }
			}
			return res.status(statusCode).send(respPayload)
		}
	)
}

exports.getWeather = (req, res) => {
	const city = req.query.city

	if (city === undefined) {
		return res.status(400).send({ msg: 'no "city" paramter provided' })
	}

	const weatherApiQuery = `${WEATHER_API}&q=${city},${COUNTRY_CODE}`
	const failureMsg = `No weather data for ${city}`
	sendApiRequest(res, weatherApiQuery, failureMsg)
}

exports.getWeatherWithCoords = (req, res) => {
	const lat = req.query.lat
	const lon = req.query.lng

	if (lat === undefined || lon === undefined) {
		return res.status(400).send({ msg: 'no "lat" and/or "lng" provided' })
	}

	const weatherApiQuery = `${WEATHER_API}&lat=${lat}&lon=${lon}`
	const failureMsg = `No weather data for ${lat} ${lon}`
	sendApiRequest(res, weatherApiQuery, failureMsg)
}

router.get('/getWeather', exports.getWeather)
router.get('/getWeatherWithCoords', exports.getWeatherWithCoords)

exports.router = router
