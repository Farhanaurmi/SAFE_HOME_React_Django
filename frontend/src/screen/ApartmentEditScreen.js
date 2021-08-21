import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { listApartmentDetails, updateApartment } from '../actions/apartmentActions'
import { APARTMENT_UPDATE_RESET, APARTMENT_CREATE_RESET } from '../constants/apartmentConstants'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import axios from 'axios'


function ApartmentEditScreen({ history, match }) {

    const apartmentId = match.params.id

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [availability, setAvailability] = useState(true)
    const [photo, setPhoto] = useState('')
    const [details, setDetails] = useState('')
    const [uploading, setUploading] = useState(false)



    const dispatch = useDispatch()

    const apartmentDetails = useSelector(state => state.apartmentDetails)
    const { error, loading, apartment } = apartmentDetails

    const apartmentUpdate = useSelector(state => state.apartmentUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = apartmentUpdate


    useEffect(() => {
        if (successUpdate) {

            dispatch({ type: APARTMENT_UPDATE_RESET })
            dispatch({ type: APARTMENT_CREATE_RESET })
            history.push('/')
        } else {
            if (!apartment.title || apartment.id !== Number(apartmentId)) {
                dispatch(listApartmentDetails(apartmentId))

            } else {
                setTitle(apartment.title)
                setPrice(apartment.price)
                setPhoto(apartment.photo)
                setAvailability(apartment.availability)
                setDetails(apartment.details)
            }

        }

    }, [apartment, apartmentId, history, dispatch, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateApartment({ id: apartmentId, title, price, photo, availability, details }))

    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        formData.append('apartment_id', apartmentId)
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/apartment/image/update', formData, config)
            setPhoto(data)
            setUploading(false)
        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <div>
            <Link to='/'> Go Back
            </Link>
            <FormContainer>
                <h1>Edit Apartment</h1>
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loadingUpdate && <Loader />}
                {loading ? (<Loader />)
                    : error ? (<Message variant='danger'>{error}</Message>)
                        : (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='title'>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Title'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='photo'>
                                    <Form.Label>Photo</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Photo'
                                        value={photo}
                                        onChange={(e) => setPhoto(e.target.value)}
                                    >
                                    </Form.Control>
                                    <Form.File
                                        id='image-file'
                                        label='Choose File'
                                        custom
                                        onChange={uploadFileHandler}
                                    >

                                    </Form.File>
                                    {uploading && <Loader />}
                                </Form.Group>

                                <Form.Group controlId='Price'>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Enter Price'
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='Details'>
                                    <Form.Label>Details</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Details'
                                        value={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='availability'>
                                    <Form.Label>Availability</Form.Label>
                                    <Form.Check
                                        type='checkbox'
                                        Label='Availability'
                                        checked={availability}
                                        onChange={(e) => setAvailability(e.target.checked)}
                                    >

                                    </Form.Check>
                                </Form.Group>

                                <Button type='submit' variant='primary'>Update</Button>
                            </Form>
                        )}
            </FormContainer>

        </div>
    )
}


export default ApartmentEditScreen
