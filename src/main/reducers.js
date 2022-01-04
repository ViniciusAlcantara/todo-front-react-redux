import { combineReducers } from "redux";
import descriptionChange from "../todo/todoReducers";

const reducers = combineReducers({
    todo: descriptionChange
})

export default reducers