import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import AccountReducer from './AccountReducer';

export default combineReducers({
  loginReducer: LoginReducer,
  accountReducer: AccountReducer,
});
