import Immutable from 'immutable';
import {expect} from 'chai';
import StackRecord from '../../src/records/stack';
import TweetRecord from '../../src/records/tweet';
import {searchLoading, searchComplete} from '../../src/reducers/stack-search';

describe('searchLoading', function() {

  it('should update props', function() {
    const stack = new StackRecord({noResults: true, loading: false, query: null});
    const state = new Immutable.List([stack]);
    const action = {
      index: 0,
      query: 'q1'
    };
    const newState = searchLoading(state, action);
    expect(newState.size).to.equal(1);
    expect(newState.get(0).loading).to.equal(true);
    expect(newState.get(0).noResults).to.equal(false);
    expect(newState.get(0).query).to.equal('q1');
  });

});

describe('searchComplete', function() {

  describe('when tweets is empty', function() {
    it('should set noResults', function() {
      const stack = new StackRecord({noResults: false, loading: true, query: 'q1', tweets: null});
      const state = new Immutable.List([stack]);
      const action = {
        index: 0,
        tweets: []
      };
      const newState = searchComplete(state, action);
      expect(newState.size).to.equal(1);
      expect(newState.get(0).loading).to.equal(false);
      expect(newState.get(0).noResults).to.equal(true);
      expect(newState.get(0).tweets).to.be.instanceOf(Immutable.List);
      expect(newState.get(0).tweets.size).to.equal(0);
    });
  });

  describe('when error', function() {
    it('should set error', function() {
      const stack = new StackRecord({noResults: false, loading: true, query: 'q1', tweets: null});
      const state = new Immutable.List([stack]);
      const action = {
        index: 0,
        tweets: [],
        error: 'fail'
      };
      const newState = searchComplete(state, action);
      expect(newState.size).to.equal(1);
      expect(newState.get(0).loading).to.equal(false);
      expect(newState.get(0).noResults).to.equal(true);
      expect(newState.get(0).tweets).to.be.instanceOf(Immutable.List);
      expect(newState.get(0).tweets.size).to.equal(0);
      expect(newState.get(0).error).to.equal('fail');
    });
  });

  it('should set props', function() {
    const stack = new StackRecord({noResults: false, loading: true, query: 'q1', tweets: null});
    const state = new Immutable.List([stack]);
    const action = {
      index: 0,
      tweets: [{id:'1'}],
    };
    const newState = searchComplete(state, action);
    expect(newState.size).to.equal(1);
    expect(newState.get(0).loading).to.equal(false);
    expect(newState.get(0).noResults).to.equal(false);
    expect(newState.get(0).tweets).to.be.instanceOf(Immutable.List);
    expect(newState.get(0).tweets.size).to.equal(1);
    expect(newState.get(0).tweets.get(0)).to.be.instanceOf(TweetRecord);
    expect(newState.get(0).tweets.get(0).id).to.equal('1');
    expect(newState.get(0).error).to.equal(null);
  });

});