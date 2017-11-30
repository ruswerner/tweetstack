import Immutable from 'immutable';

const TweetUserRecord = new Immutable.Record({
  name: null,
  profile_image_url: null,
  screen_name: null,
  verified: false
});

export default TweetUserRecord;
