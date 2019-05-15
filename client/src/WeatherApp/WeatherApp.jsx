import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

import TitleBar from './components/TitleBar'
import InputHeaders from './components/InputHeaders'
import CityInputFields from './components/CityInputFields'
import WeatherFooter from './components/Footer'

require('./sass/style.scss')
const fetch = require('isomorphic-fetch')

const NUM_INPUT = 4

class WeatherApp extends Component {
	state = {
		cityMessages: Array(NUM_INPUT).fill(''),
		weatherMessages: Array(NUM_INPUT).fill(''),
		currentRequests: Array(NUM_INPUT).fill(undefined),
		pins: [],
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
			state: { cityMessages, weatherMessages, }
		} = this
		cityMessages[inputIdx] = ''
		weatherMessages[inputIdx] = ''

		return fetch(`/api/v1/getWeather?city=${cityQuery}`)
			.then(resp => {
				if (resp.status / 100 === 2) {
					return resp.json()
				}
			})
			.then(resp => {
				cityMessages[inputIdx] = resp.city
				weatherMessages[inputIdx] = resp.weather
				this.setState({
					cityMessages: cityMessages,
					weatherMessages: weatherMessages,
				})
			})
			.catch(() => {
				if (cityQuery) {
					weatherMessages[inputIdx] = `No weather data for "${cityQuery}"`
				}
				this.setState({
					cityMessages: cityMessages,
					weatherMessages: weatherMessages,
				})
			})
	}

	render() {
		const {
			state: { weatherMessages, cityMessages },
		} = this
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
				<WeatherFooter />
			</Container>
		)
	}
}

export default WeatherApp
