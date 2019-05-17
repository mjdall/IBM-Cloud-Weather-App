import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

import TitleBar from './components/TitleBar'
import InputHeaders from './components/InputHeaders'
import CityInputFields from './components/CityInputFields'
import CityMap from './components/CityMap'
import WeatherFooter from './components/Footer'
import { GetAPIPromise } from './js/helpers'

require('./sass/style.scss')

const NUM_INPUT = 4

class WeatherApp extends Component {
	state = {
		cityMessages: Array(NUM_INPUT).fill(''),
		weatherMessages: Array(NUM_INPUT).fill(''),
		pinPositions: Array(NUM_INPUT).fill(undefined),
		currentRequests: Array(NUM_INPUT).fill(undefined),
		pins: [],
	}

	componentDidMount() {
		let {
			state: { cityMessages, weatherMessages, pinPositions },
		} = this
		const apiEndpoint = '/api/v1/getInputFields'
		GetAPIPromise(apiEndpoint, resp => {
			cityMessages.map((msg, idx) => {
				if (resp[idx] !== undefined) {
					cityMessages[idx] = resp[idx].city
					weatherMessages[idx] = resp[idx].weather
					pinPositions[idx] = resp[idx].location
				}
			})
			this.setState({
				cityMessages,
				weatherMessages,
				pinPositions
			})
		},
		() => {})
	}

	/*
		Callback function for the input fields.
		@param enteredCity The text in the input field.
		@param inputIdx An int in the range [0-NUM_INPUT).
			Specifies what input field was written to. 
	*/
	handleCityChange = (enteredCity, inputIdx) => {
		let {
			state: { currentRequests },
		} = this

		clearTimeout(currentRequests[inputIdx])
		currentRequests[inputIdx] = setTimeout(
			() => this.createFetchRequest(inputIdx, enteredCity),
			500,
		)
		this.setState({
			currentRequests: currentRequests,
		})
	}

	createFetchRequest = (inputIdx, cityQuery) => {
		let {
			state: { cityMessages, weatherMessages, pinPositions },
		} = this
		cityMessages[inputIdx] = ''
		weatherMessages[inputIdx] = ''
		pinPositions[inputIdx] = undefined

		const apiEndpoint = `/api/v1/getWeather?city=${cityQuery}&input=${inputIdx}`
		const successCallback = resp => {
			cityMessages[inputIdx] = resp.city
			weatherMessages[inputIdx] = resp.weather
			pinPositions[inputIdx] = {
				lat: resp.lat,
				lng: resp.lng,
			}
			this.setState({
				cityMessages: cityMessages,
				weatherMessages: weatherMessages,
				pinPositions: pinPositions,
			})
		}

		const failureCallback = () => {
			if (cityQuery) {
				weatherMessages[inputIdx] = `No weather data for "${cityQuery}"`
			}
			this.setState({
				cityMessages: cityMessages,
				weatherMessages: weatherMessages,
			})
		}
		GetAPIPromise(apiEndpoint, successCallback, failureCallback)
	}

	/**
	 * Filters any duplicate or not set pin locations.
	 */
	getFilteredPins = () => {
		const reducer = (accumulator, latLng) => {
			const matchedLatLon = accumulator
				.slice(0)
				.filter(
					uniqueLL =>
						uniqueLL.lat === latLng.lat && uniqueLL.lng === latLng.lng,
				)
			if (matchedLatLon.length === 0) {
				accumulator.push(latLng)
			}
			return accumulator
		}
		return this.state.pinPositions
			.filter(latLng => latLng !== undefined)
			.reduce(reducer, [])
	}

	render() {
		const {
			state: { weatherMessages, cityMessages },
		} = this

		const filteredPinPositions = this.getFilteredPins()
		return (
			<Container className="App">
				<Row>
					<TitleBar />
				</Row>
				<br />
				<Col>
					<InputHeaders />
					<CityInputFields
						weatherMessages={weatherMessages}
						cityMessages={cityMessages}
						inputCallback={this.handleCityChange}
					/>
				</Col>
				<Row>
					<CityMap pinPositions={filteredPinPositions} />
				</Row>
				<WeatherFooter />
			</Container>
		)
	}
}

export default WeatherApp
