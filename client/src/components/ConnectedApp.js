import {connect} from 'react-redux';
import {
  addStack,
  removeStack,
  searchStack,
  clearAllStacks,
  refreshStack,
  rehydrateStacks
} from '../actions/stacks';
import App from './App';

const mapStateToProps = state => {
  return {
    stacks: state.stacks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addStack: () => dispatch(addStack()),
    removeStack: i => dispatch(removeStack(i)),
    searchStack: (i, query) => dispatch(searchStack(i, query)),
    clearAllStacks: autoAdd => dispatch(clearAllStacks(autoAdd)),
    refreshStack: i => dispatch(refreshStack(i)),
    onMount: () => dispatch(rehydrateStacks())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
