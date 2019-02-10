import {combineReducers} from 'redux';
import {reducer as FormReducer} from 'redux-form'
import testReducer from '../../features/testarea/testReducer'
import {reducer as toastrReducer} from 'react-redux-toastr'
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import eventReducer from '../../features/event/eventReducer'
import modalReducer from "../../features/modals/modalReducer";
import authReducer from "../../features/auth/authReducer";
import asyncReducer from "../../features/async/asyncReducer";
const rootReducer = combineReducers({
    form:FormReducer,
    test:testReducer,
    events:eventReducer,
    modals:modalReducer,
    auth: authReducer,
    async:asyncReducer,
    toastr: toastrReducer,
    firebase : firebaseReducer,
    firestore : firestoreReducer
})

export default rootReducer;