import React from 'react'
import { Container, Row, Col } from 'reactstrap'

function TitleBar () {
  return(
    <Container className='title-bar-container'>
      <Row>
        <Col md={{ size: 6, offset: 3 }} >
          <h1 className='weather-title'>Weather App</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default TitleBar
