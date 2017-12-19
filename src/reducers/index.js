import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import AccountReducer from './AccountReducer';
import GeneralReducer from './GeneralReducer';
import SearchReducer from './SearchReducer';

export default combineReducers({
  loginReducer: LoginReducer,
  accountReducer: AccountReducer,
  generalReducer: GeneralReducer,
  searchReducer: SearchReducer,
});
