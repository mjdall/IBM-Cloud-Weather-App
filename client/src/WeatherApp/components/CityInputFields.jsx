import React from 'react'
import { Row, Col, Input } from 'reactstrap'

const CityInputFields = ({
	weatherMessages,
	cityMessages,
	inputCallback,
}) => {
	return (
		weatherMessages.map((message, idx) => {
			const cityMessage = cityMessages[idx]
			const hasCityMessage = cityMessage !== ''
			const displayedMessage =
				hasCityMessage ? `${cityMessages[idx]} - ${message}` : message
			const placeHolder = hasCityMessage ? cityMessage : 'enter city name...'
			return (
				<>
					<Row key={`input-field-row-${idx}`}>
						<Col className="city-input-col" md={{ size: 4 }}>
							<Input
								id={`city${idx + 1}`}
								className="city-input-field"
								placeholder={placeHolder}
								onChange={e => inputCallback(e.target.value, idx)}
							/>
							,
						</Col>
						<Col md={{ size: 8 }} className="weather-message-col">
							<h6 className="weather-message-text">{displayedMessage}</h6>
						</Col>
					</Row>
					<br />
				</>
			)
		})
	)
}

export default CityInputFields
