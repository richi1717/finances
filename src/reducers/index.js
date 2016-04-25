import { combineReducers } from 'redux';
import Bills from './reducer_bills';
import Cash from './reducer_cash';
import Account from './reducer_account';
import RowName from './reducer_remove';
import blurEffects from './reducer_effects.js';

const rootReducer = combineReducers({
  bills: Bills,
  cash: Cash,
  rowName: RowName,
  account: Account,
  blurEffects
});

export default rootReducer;
