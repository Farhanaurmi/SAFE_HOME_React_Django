import React, { useState, useEffect } from 'react'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listApartmentDetails } from '../actions/apartmentActions'
import { createBooking } from '../actions/bookingActions'



function ApartmentScreen({ match, history }) {
    const dispatch = useDispatch()

    const apartmentDetails = useSelector(state => state.apartmentDetails)
    const { error, loading, apartment } = apartmentDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const bookingCreate = useSelector(state => state.bookingCreate)
    const { error: errorB, loading: loadingB, booking } = bookingCreate




    useEffect(() => {
        dispatch(listApartmentDetails(match.params.id))
    }, [dispatch, match])

    const bookingHandler = () => {
        dispatch(createBooking({
            apartment_id: apartment.id
        }))
    }


    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>


            {loading ? <Loader />
                : error ? <Message variant='secondary'>{error}</Message>
                    : (<div>
                        <Row>
                            <Col md={6}>
                                <Image src={apartment.photo} alt={apartment.title} fluid />
                            </Col>
                            <Col md={3}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h3>{apartment.title}</h3>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        price : ${apartment.price}
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Details : {apartment.details}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price : </Col>
                                                <Col><strong>${apartment.price}</strong></Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status: </Col>
                                                <Col>{apartment.availability ? 'Available' : 'Not Available Right Now'}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Button
                                                onClick={bookingHandler}
                                                className='btn-block'
                                                disabled={!apartment.availability}
                                                type='button'>Booking </Button>
                                        </ListGroup.Item>
                                        {error && <Message variant='danger'>{error}</Message>}
                                        {loading && <Loader />}

                                        {booking && <Message variant='primary'>
                                            Your Booking id is {booking.id}. We will contact you through your e-mail with-in 24 hours. Stay safe. 
                                        </Message>}
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>


                    </div>
                    )
            }
        </div>
    )
}

export default ApartmentScreen