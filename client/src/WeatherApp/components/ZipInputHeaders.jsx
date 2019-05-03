import React from 'react'
import { Row, Col } from 'reactstrap'

const ZipInputHeaders = () => {
	return (
		<Row>
			<Col md={{ size: 2, offset: 1 }}>
				<h5>Zip Code</h5>
			</Col>
			<Col md={{ size: 2, offset: 5 }}>
				<h5 id="weather">Weather</h5>
			</Col>
		</Row>
	)
}

export default ZipInputHeaders
