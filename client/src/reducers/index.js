import {combineReducers} from "redux"
// combine Reducers will combine all the reducers in our application
import authReducer  from './AuthReducer';
import postReducer from "./PostReducer";

export const reducers =combineReducers({authReducer,postReducer})

