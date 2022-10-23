import { createStore, combineReducers} from 'redux';
import userReducer from './userReducer';
 
const rootReducer = combineReducers({
  userGlobalData: userReducer,
  userGlobalEmail: userReducer
});
 
export const store = createStore(rootReducer);