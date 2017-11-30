import Immutable from 'immutable';
import StackRecord from '../records/stack';

import addStack from './add-stack';
import removeStack from './remove-stack';
import {searchLoading, searchComplete} from './stack-search';

const INITIAL_STATE = new Immutable.List([new StackRecord()]);

export default function stacksReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_STACK':
      return addStack(state);

    case 'REMOVE_STACK':
      return removeStack(state, action);

    case 'CLEAR_ALL_STACKS':
      return new Immutable.List();

    case 'STACK_SEARCH_LOADING':
      return searchLoading(state, action);

    case 'STACK_SEARCH_COMPLETE':
      return searchComplete(state, action);

    default:
      return state;
  }
}
