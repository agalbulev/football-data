import { createStore, combineReducers, applyMiddleware } from 'redux';
import footbalData from './reducers/footballData';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { getCompetitions } from './actions/getCompetitions'

const store = createStore(combineReducers({footbalData: footbalData}), composeWithDevTools(applyMiddleware(thunk)));

store.dispatch(getCompetitions());

export default store;