import { createStore, applyMiddleware, compose } from "redux";//El applyMiddleware me sirve para usar el middleware 
import rootReducer from "./reducer";
import thunkMiddleware from "redux-thunk"; //thunk middleware es una función que puede funcionar por si misma.

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// lo trajé del m2 xD, me sirve para que pueda darle la capacidad al store de usar redux devtools. 

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))//aplico el middleware. que middleware? thunkmiddleware
)

export default store;
