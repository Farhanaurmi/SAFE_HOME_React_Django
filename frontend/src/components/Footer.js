import { Container,Row,Col } from 'react-bootstrap'
import React from 'react'

function Footer() {
    return (
        <div>
            <footer>
                <Container>
                    <Row>
                        <Col className="text-center py-3">Copyright &copy; SAFE HOME</Col>
                    </Row>
                </Container>
                </footer>
        </div>
    )
}

export default Footer