import React, { useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import Apartment from '../components/Apartment'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listApartments, createApartment } from '../actions/apartmentActions'
import { APARTMENT_LIST_RESET, APARTMENT_CREATE_RESET } from '../constants/apartmentConstants'


function HomeScreen({ history }) {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const apartmentList = useSelector(state => state.apartmentList)
    const { error, loading, apartments } = apartmentList

    const apartmentDelete = useSelector(state => state.apartmentDelete)
    const { loading: loadingD, error: errorD, success } = apartmentDelete

    const apartmentCreate = useSelector(state => state.apartmentCreate)
    const { loading: loadingC, error: errorC, success: successC, apartment: apartmentC } = apartmentCreate



    useEffect(() => {
        if (success) {
            dispatch({ type: APARTMENT_LIST_RESET })
            dispatch(listApartments())
        } else {
            dispatch(listApartments())
        }

        if (successC) {
            dispatch({ type: APARTMENT_CREATE_RESET })
            history.push(`/apartment/${apartmentC.id}/edit`)
        }

    }, [dispatch, history, successC, success])

    const createApartmentHandler = () => {
        dispatch(createApartment())
    }


    return (
        <div>

            {userInfo && userInfo.isAdmin && (

                <Button className='my-3' onClick={createApartmentHandler}>
                    <i className='fas fa-plus'></i> Create Apartment
                </Button>
            )}
            <h1>Apartments</h1>
            {loading ? <Loader />
                : error ? <Message variant='secondary'>{error}</Message>
                    :
                    <div>
                        <Row>
                            {apartments.map(apartment => (
                                <Col key={apartment.id} sm={12} md={6} lg={4} xl={3}>
                                    <Apartment apartment={apartment} userInfo={userInfo} />
                                </Col>
                            ))}
                        </Row>
                    </div>
            }


        </div>

    )
}

export default HomeScreen