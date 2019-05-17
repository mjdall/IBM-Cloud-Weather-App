const express = require('express')
const router = express.Router()
let fetch = require('isomorphic-fetch')

const WEATHER_API =
  'http://api.openweathermap.org/data/2.5/weather?appid=6b7b471967dd0851d0010cdecf28f829&units=metric'
const COUNTRY_CODE = 'NZ'

const Cloudant = require('@cloudant/cloudant')
const dbUser = process.env.CLOUDANT_USER
const dbPass = process.env.CLOUDANT_PASS
const dbURI = process.env.CLOUDANT_DB

const api = `https://${dbUser}:${dbPass}@${dbUser}.${dbURI}`
const cloudant = Cloudant(api)
const weatherDB = cloudant.use('weather')

const DestroyLatestRevision = (docId, database) => {
	return database.get(docId).then(resp => database.destroy(docId, resp._rev))
}

const ReplaceInputField = (docId, insertJSON, database) => {
	const createNewDocument = () => {
		return database.insert(insertJSON)
	}
	return DestroyLatestRevision(docId, database)
		.then(createNewDocument)
		.catch(err => {
			// document can be created still
			if (err.reason === 'deleted') {
				return createNewDocument()
			}
			return err
		})
}

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

const sendApiRequest = (res, weatherApiQuery, inputIdx, failureMsg) => {
	return fetch(weatherApiQuery)
		.then(resp => resp.json())
		.then(resp => {
			// not a 200, return failure message
			if (resp.cod !== 200) {
				res.status(400).send({ msg: failureMsg })
				return
			}

			// get report, if res is undefined, this wasn't a request
			const weatherReport = getWeatherConditions(resp)
			if (res === undefined) {
				return weatherReport
			}

			// was a request, return weather and update latest field check
			res.status(200).send(weatherReport)
			if (inputIdx !== undefined) {
				updateInputField(inputIdx, weatherReport.city, {
					lat: weatherReport.lat,
					lng: weatherReport.lng,
				})
			}
		})
		.catch(err => {
			if (res === undefined) {
				return err
			}
			res.send(400).send({ msg: 'Failed to get data' })
		})
}

const updateInputField = (fieldNum, city, location) => {
	const fieldMap = {
		0: 'fieldOne',
		1: 'fieldTwo',
		2: 'fieldThree',
		3: 'fieldFour',
		100: 'map',
	}
	const docId = fieldMap[fieldNum]
	const insertJSON = {
		_id: docId,
		city: city,
		location: location,
	}
	ReplaceInputField(docId, insertJSON, weatherDB)
}

exports.getInputFields = (req, res) => {
	// bit lame way of doing this but hand in is soon
	const fieldIds = ['fieldOne', 'fieldTwo', 'fieldThree', 'fieldFour', 'map']
	let inputFields = {
		0: undefined,
		1: undefined,
		2: undefined,
		3: undefined,
		4: undefined,
	}
	let promises = []
	fieldIds.map((fieldId, idx) => {
		const fieldPromise = weatherDB
			.get(fieldId)
			.then(resp => {
				return getWeatherLocal(resp.city, undefined, undefined)
			})
			.then(weatherReport => {
				// format response
				inputFields[idx] = {
					city: weatherReport.city,
					location: { lat: weatherReport.lat, lng: weatherReport.lng },
					weather: weatherReport.weather,
				}
			})
			.catch(() => {
				inputFields[idx] = undefined
			})
		promises.push(fieldPromise)
	})
	Promise.all(promises).then(() => {
		return res.status(200).send(inputFields)
	})
}

const getWeatherLocal = (city, inputIdx, res) => {
	const weatherApiQuery = `${WEATHER_API}&q=${city},${COUNTRY_CODE}`
	const failureMsg = `No weather data for ${city}`
	return sendApiRequest(res, weatherApiQuery, inputIdx, failureMsg)
}

exports.getWeather = (req, res) => {
	const city = req.query.city
	const inputIdx = req.query.input

	if (city === undefined) {
		return res.status(400).send({ msg: 'no "city" paramter provided' })
	}

	getWeatherLocal(city, inputIdx, res)
}

exports.getWeatherWithCoords = (req, res) => {
	const lat = req.query.lat
	const lon = req.query.lng
	const inputIdx = req.query.input

	if (lat === undefined || lon === undefined) {
		return res.status(400).send({ msg: 'no "lat" and/or "lng" provided' })
	}

	const weatherApiQuery = `${WEATHER_API}&lat=${lat}&lon=${lon}`
	const failureMsg = `No weather data for ${lat} ${lon}`
	sendApiRequest(res, weatherApiQuery, inputIdx, failureMsg)
}

router.get('/getWeather', exports.getWeather)
router.get('/getWeatherWithCoords', exports.getWeatherWithCoords)
router.get('/getInputFields', exports.getInputFields)

exports.router = router
