import Immutable from 'immutable';
import TweetRecord from '../records/tweet';
import TweetUserRecord from '../records/tweet-user';

function asImmutableTweetList(tweets) {
  return new Immutable.List(tweets.map(t => new TweetRecord({
    ...t,
    user: new TweetUserRecord(t.user)
  })));
}

export function searchLoading(state, action) {
  return state.withMutations(list => {
    list.setIn([action.index, 'loading'], true);
    list.setIn([action.index, 'noResults'], false);
    list.setIn([action.index, 'query'], action.query);
  });
}

export function searchComplete(state, action) {
  return state.withMutations(list => {
    list.setIn([action.index, 'loading'], false);
    list.setIn([action.index, 'tweets'], asImmutableTweetList(action.tweets));
    if (action.tweets.length === 0) {
      list.setIn([action.index, 'noResults'], true);
    }
    list.setIn([action.index, 'error'], action.error ? String(action.error) : null);
  });
}