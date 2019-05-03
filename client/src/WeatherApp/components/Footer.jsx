import React from 'react'
import { Container, Row, Col } from 'reactstrap'

const WeatherFooter = () => {
  return (
    <Container>
      <hr />
      <Col md={{ size: 4, offset: 4 }}>
        <Row>
          <h6 className="maintainer-tag">@maintainer&#8239;</h6>
          <a className="maintainer-link" href="https://github.com/mjdall" target="__blank">
            <h6 className="maintainer-link">Morgan Dally</h6>
          </a>
        </Row>
      </Col>
    </Container>
  )
}

export default WeatherFooter
