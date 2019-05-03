import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

import TitleBar from './components/TitleBar'
import ZipInputHeaders from './components/ZipInputHeaders'
import ZipCodeInputFields from './components/ZipCodeInputFields'
import WeatherFooter from './components/Footer'

require('./sass/style.scss')
const fetch = require('isomorphic-fetch')

const NUM_INPUT = 4
const EXPECTED_ZIP_LENGTH = 5

class WeatherApp extends Component {
	state = {
		cityMessages: Array(NUM_INPUT).fill(''),
		weatherMessages: Array(NUM_INPUT).fill(''),
		pins: [],
	}

	/*
		Callback function for the input fields.
		@param enteredZipCode The text in the input field.
		@param inputIdx An int in the range [0-NUM_INPUT).
			Specifies what input field was written to. 
	*/
	handleZipCodeChange = (enteredZipCode, inputIdx) => {
		let {
			state: { cityMessages, weatherMessages },
		} = this

		cityMessages[inputIdx] = ''
		weatherMessages[inputIdx] = ''

		if (enteredZipCode.length !== EXPECTED_ZIP_LENGTH) {
			this.setState({
				cityMessages: cityMessages,
				weatherMessages: weatherMessages,
			})
			return
		}

		fetch(`/api/v1/getWeather?zip=${enteredZipCode}`)
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
				weatherMessages[inputIdx] = `No weather data for ${enteredZipCode}`
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
					<ZipInputHeaders />
					<ZipCodeInputFields
						weatherMessages={weatherMessages}
						cityMessages={cityMessages}
						inputCallback={this.handleZipCodeChange}
					/>
				</Col>
				<WeatherFooter />
			</Container>
		)
	}
}

export default WeatherApp
