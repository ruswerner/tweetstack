import {combineReducers} from 'redux';
import stacksReducer from './stacks';

export default combineReducers({
  stacks: stacksReducer
});
