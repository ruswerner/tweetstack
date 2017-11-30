import Immutable from 'immutable';

const TweetRecord = new Immutable.Record({
  id: null,
  text: null,
  created_at: null,
  user: null
});

export default TweetRecord;
