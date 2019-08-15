import {createStore, applyMiddleware} from "redux";
import {reducer} from "./data/reducer";
import thunk from "redux-thunk";

export const store = createStore(reducer, applyMiddleware(thunk));

