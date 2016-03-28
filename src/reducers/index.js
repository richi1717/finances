import { combineReducers } from 'redux';
import Bills from './reducer_bills';
import Cash from './reducer_cash';
import RowName from './reducer_remove';

const rootReducer = combineReducers({
  bills: Bills,
  cash: Cash,
  rowName: RowName
});

export default rootReducer;
