import { 
    createStore, 
    combineReducers, 
    applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer 
} from './reducers/userReducers'

import { 
    apartmentListReducer,
    apartmentDetailsReducer,
    apartmentDeleteReducer,
    apartmentCreateReducer,
    apartmentUpdateReducer
} from './reducers/apartmentReducers'

import { 
    bookingCreateReducer,
    bookingDetailsReducer,
    bookingPayReducer 
} from './reducers/bookingReducers'



const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,

    apartmentList:apartmentListReducer,
    apartmentDetails:apartmentDetailsReducer,
    apartmentDelete:apartmentDeleteReducer,
    apartmentCreate:apartmentCreateReducer,
    apartmentUpdate:apartmentUpdateReducer,

    bookingCreate:bookingCreateReducer,
    bookingDetails:bookingDetailsReducer,
    bookingPay:bookingPayReducer,
    
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo')) : null


const initialState = {
    userLogin:{ 
        userInfo: userInfoFromStorage 
    }
}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store