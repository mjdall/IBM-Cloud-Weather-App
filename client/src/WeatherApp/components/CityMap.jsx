import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'
import GoogleMapReact from 'google-map-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { GetAPIPromise } from '../js/helpers'

const defaultMsg = 'Click the map to begin'
const errMsg = 'Error retrieving weather...'

const Pin = () => (
	<FontAwesomeIcon icon={faMapPin} size="4x" style={{ color: '#FF5E5B' }} />
)

const LoadSpinner = () => (
	<FontAwesomeIcon icon={faSpinner} size="2x" className="map-request-spinner" />
)

const CityMap = ({ pinPositions }) => {
	const [weatherMsg, setWeatherMsg] = useState(defaultMsg)
	const [selectedPin, setSelectedPin] = useState(undefined)

	const sendReq = ({ lat, lng }) => {
		setWeatherMsg('')
		setSelectedPin(undefined)
		const apiEndpoint = `/api/v1/getWeatherWithCoords?lat=${lat}&lng=${lng}&input=100`
		const successCallback = resp => {
			setWeatherMsg(`${resp.city} - ${resp.weather}`)
			setSelectedPin({ lat: lat, lng: lng })
		}
		const failureCallback = () => setWeatherMsg(errMsg)
		GetAPIPromise(apiEndpoint, successCallback, failureCallback)
	}

	// copy array and push the selected pin if it's set
	let displayedPins = pinPositions.slice(0)
	if (selectedPin !== undefined) {
		displayedPins.push(selectedPin)
	}

	return (
		<>
			<Col>
				<Row>
					<Col md={{ size: 8, offset: 2 }} style={{ display: 'inline', textAlign: 'center' }}>
						{weatherMsg.length === 0 ? (
							<LoadSpinner />
						) : (
							<h6 className="weather-message-text">{weatherMsg}</h6>
						)}
					</Col>
				</Row>
				<Row style={{ height: '100vh', width: '100%' }}>
					<GoogleMapReact
						bootstrapURLKeys={{
							key: 'AIzaSyBwBArdy5LSAGkTQI_7NEK_ytGAo7SJSfI',
						}}
						defaultCenter={{ lat: -36.849, lng: 174.763 }}
						defaultZoom={9}
						onClick={sendReq}
					>
						{displayedPins.map((pinLoc, idx) => (
							<Pin key={`pin-${idx}`} lat={pinLoc.lat} lng={pinLoc.lng} />
						))}
					</GoogleMapReact>
				</Row>
			</Col>
		</>
	)
}

CityMap.propTypes = {
	pinPositions: PropTypes.array
}

export default CityMap
