import { combineReducers } from "redux";
import { property } from "./property.reducer.js";
import {detailedSearchReducer} from './detailedSearch.reducer.js';

const rootReducer = combineReducers({
  property,
  detailedSearch: detailedSearchReducer
});

export default rootReducer;