import React, { useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { LinkContainer } from 'react-router-bootstrap'
import { deleteApartment, listApartments } from '../actions/apartmentActions'
import { APARTMENT_LIST_RESET } from '../constants/apartmentConstants'


function Apartment({ apartment }) {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const apartmentDelete = useSelector(state => state.apartmentDelete)
    const { loading, error, success } = apartmentDelete

    let history = useHistory()

    



    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to this apartment?')) {
            dispatch(deleteApartment(id))
        }

    }

    return (
        <div>
            
            <Card className="my-3 p-3 rounded">
                <Link to={`/apartment/${apartment.id}/view`}>
                    <Card.Img src={apartment.photo} />
                </Link>
                <Card.Body>
                    <Link to={`/apartment/${apartment.id}/view`}>
                        <Card.Title as="div" >
                            <strong>
                                {apartment.title}
                            </strong>
                        </Card.Title>
                    </Link>
                    <Card.Text as="h3" >
                        ${apartment.price}
                    </Card.Text>

                    {userInfo && userInfo.isAdmin && (
                        <Card.Text as="h3" >

                            <LinkContainer to={`/apartment/${apartment.id}/edit`}>
                                <Button variant='dark' className='btn-sm' className='my-1'>
                                    <i className='fas fa-edit'></i>
                                </Button>
                            </LinkContainer>


                            <Button variant='danger' className='btn-sm' className='my-1' onClick={() => deleteHandler(apartment.id)}>
                                <i className='fas fa-trash'></i>
                            </Button>

                        </Card.Text>
                    )}
                </Card.Body>
            </Card>
        </div>
    )
}

export default Apartment