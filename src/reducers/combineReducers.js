/**
 * Required modules.
 */
import { combineReducers } from "redux";
import { gateways } from "./reducers";

/**
 * Combines all reducers of the application
 * (only one reducer for this application).
 */
const _combineReducers = combineReducers({
    gateways
});

/**
 * Exporting component
 */
export default _combineReducers;
