import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

// import reducers
import { authReducer } from './reducers/authReducers';
import { billingsReducer, newBillingReducer, billingActionReducer } from './reducers/billingReducers';

// combine reducers
const reducer = combineReducers({
  auth: authReducer,
  billingAction: billingActionReducer,
  billings: billingsReducer,
  newBilling: newBillingReducer,
});

let initialState = {};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
