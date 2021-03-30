import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import paginationReducer from "./paginationReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    pagination: paginationReducer
})

const store = createStore(rootReducer,
    composeEnhancers(applyMiddleware(thunk)))
window.store = store

export default store