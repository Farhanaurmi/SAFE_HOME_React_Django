import { 
  
    BOOKING_DETAILS_REQUEST,
    BOOKING_DETAILS_SUCCESS,
    BOOKING_DETAILS_FAIL,

    BOOKING_CREATE_REQUEST,
    BOOKING_CREATE_SUCCESS,
    BOOKING_CREATE_FAIL,
    BOOKING_CREATE_RESET,

    BOOKING_PAY_REQUEST,
    BOOKING_PAY_SUCCESS,
    BOOKING_PAY_FAIL,
    BOOKING_PAY_RESET,

} from '../constants/bookingConstants'
import axios from 'axios'

export const createBooking =(booking)=>async(dispatch,getState)=>{
    try{
        dispatch({type:BOOKING_CREATE_REQUEST})

        const {
            userLogin: {userInfo},
        }= getState()

        const config ={
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const{ data }= await axios.post( 
            '/api/booking/create',
            booking,
             config )

        dispatch({
            type:BOOKING_CREATE_SUCCESS,
            payload: data})

    
    }

    catch(error){
        dispatch({
            type:BOOKING_CREATE_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}



