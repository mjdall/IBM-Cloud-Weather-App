import React from 'react'
import { Row, Col, Input } from 'reactstrap'

const ZipCodeInputFields = ({
	weatherMessages,
	cityMessages,
	inputCallback,
}) => {
	return (
		weatherMessages.map((message, idx) => {
			const cityMessage = cityMessages[idx]
			const displayedMessage =
				cityMessage !== '' ? `${cityMessages[idx]} - ${message}` : message
			return (
				<>
					<Row key={`input-field-row-${idx}`}>
						<Col className="zip-code-input-col" md={{ size: 4 }}>
							<Input
								id={`zip${idx + 1}`}
								className="zip-code-input-field"
								placeholder="enter zip code..."
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

export default ZipCodeInputFields
