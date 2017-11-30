import Immutable from 'immutable';

const StackRecord = new Immutable.Record({
  query: '',
  showDetailFor: null,
  noResults: false,
  error: null,
  tweets: new Immutable.List(),
  loading: false
});

export default StackRecord;