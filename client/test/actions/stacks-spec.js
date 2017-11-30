import Immutable from 'immutable';
import {expect} from 'chai';
import sinon from 'sinon';
import {
  AUTO_ADD_DELAY,
  addStack,
  removeStack,
  refreshStack,
  searchStack,
  clearAllStacks,
  rehydrateStacks
} from '../../src/actions/stacks';
import StackRecord from '../../src/records/stack';

function createFetchStub() {
  const fetch = sinon.stub();
  fetch.returns({
    then: () => ({
      catch: () => null
    })
  });
  return fetch;
}

describe('stack actions', function() {

  describe('addStack', function() {
    it('should return action', function() {
      const action = addStack();
      expect(action).to.be.ok;
      expect(action.type).to.equal('ADD_STACK');
    });
  });

  describe('removeStack', function() {
    describe('when only 1 stack', function() {
      it('should delay dispatch addStack', function() {
        const setTimeoutStub = sinon.stub(global, 'setTimeout');

        const dispatch = sinon.spy();
        const getState = () => ({
          stacks: new Set([{}])
        });
        removeStack(0)(dispatch, getState);

        expect(setTimeoutStub.callCount).to.equal(1);
        expect(setTimeoutStub.getCall(0).args[0]).to.be.instanceOf(Function);
        expect(setTimeoutStub.getCall(0).args[1]).to.equal(300);
        setTimeoutStub.getCall(0).args[0]();

        expect(dispatch.callCount).to.equal(2);
        expect(dispatch.getCall(0).args[0].type).to.equal('REMOVE_STACK');
        expect(dispatch.getCall(0).args[0].index).to.equal(0);
        expect(dispatch.getCall(1).args[0].type).to.equal('ADD_STACK');

        setTimeoutStub.restore();
      });
    });

    it('should return action', function() {
      const dispatch = sinon.spy();
      const getState = () => ({
        stacks: new Set([{}, {}])
      });
      removeStack(0)(dispatch, getState);
      expect(dispatch.callCount).to.equal(1);
      const action = dispatch.getCall(0).args[0];
      expect(action.type).to.equal('REMOVE_STACK');
      expect(action.index).to.equal(0);
    });
  });

  describe('refreshStack', function() {

    it('should call searchStack with current query', function() {
      global.fetch = createFetchStub();

      const dispatch = sinon.spy();
      const getState = () => ({
        stacks: new Immutable.List([
          new StackRecord({
            query: 'q1'
          })
        ])
      });

      refreshStack(0)(dispatch, getState);
      expect(global.fetch.callCount).to.equal(1);
      expect(global.fetch.getCall(0).args[0]).to.equal('/api/search?q=q1');
      expect(dispatch.callCount).to.equal(1);
      expect(dispatch.getCall(0).args[0].type).to.equal('STACK_SEARCH_LOADING');
      expect(dispatch.getCall(0).args[0].index).to.equal(0);
      expect(dispatch.getCall(0).args[0].query).to.equal('q1');

      delete global.fetch;
    });

  });

  describe('searchStack', function() {

    it('should dispatch loading', function() {
      global.fetch = createFetchStub();
      const dispatch = sinon.spy();
      searchStack(0, 'q2')(dispatch);
      expect(dispatch.callCount).to.equal(1);
      expect(dispatch.getCall(0).args[0].type).to.equal('STACK_SEARCH_LOADING');
      expect(dispatch.getCall(0).args[0].index).to.equal(0);
      expect(dispatch.getCall(0).args[0].query).to.equal('q2');
      delete global.fetch;
    });

    describe('when api success', async function() {
      const tweets = [{id_str: '1'}];
      global.fetch = sinon.stub();
      const json = sinon.stub();
      json.resolves(tweets);
      fetch.resolves({json});
      const dispatch = sinon.spy();
      await searchStack(0, 'q3')(dispatch);
      expect(dispatch.callCount).to.equal(2);
      expect(dispatch.getCall(0).args[0].type).to.equal('STACK_SEARCH_LOADING');
      expect(dispatch.getCall(0).args[0].index).to.equal(0);
      expect(dispatch.getCall(0).args[0].query).to.equal('q3');
      expect(dispatch.getCall(1).args[0].type).to.equal('STACK_SEARCH_COMPLETE');
      expect(dispatch.getCall(1).args[0].index).to.equal(0);
      expect(dispatch.getCall(1).args[0].tweets).to.equal(tweets);
      delete global.fetch;
    });

    describe('when api fails', async function() {
      global.fetch = sinon.stub();
      fetch.rejects('Error');
      const dispatch = sinon.spy();
      await searchStack(0, 'q4')(dispatch);
      expect(dispatch.callCount).to.equal(2);
      expect(dispatch.getCall(0).args[0].type).to.equal('STACK_SEARCH_LOADING');
      expect(dispatch.getCall(0).args[0].index).to.equal(0);
      expect(dispatch.getCall(0).args[0].query).to.equal('q4');
      expect(dispatch.getCall(1).args[0].type).to.equal('STACK_SEARCH_COMPLETE');
      expect(dispatch.getCall(1).args[0].index).to.equal(0);
      expect(dispatch.getCall(1).args[0].tweets).to.eql([]);
      expect(dispatch.getCall(1).args[0].error).to.be.instanceOf(Error);
      delete global.fetch;
    });
  });

  describe('clearAllStacks', function() {

    it('should dispatch', function() {
      const dispatch = sinon.spy();
      clearAllStacks()(dispatch);
      expect(dispatch.callCount).to.equal(1);
      expect(dispatch.getCall(0).args[0].type).to.equal('CLEAR_ALL_STACKS');
    });

    describe('when autoAdd', function() {
      it('should delay dispatch', function() {
        const dispatch = sinon.spy();
        const stub = sinon.stub(global, 'setTimeout');
        stub.callsArg(0);
        clearAllStacks(true)(dispatch);
        expect(dispatch.callCount).to.equal(2);
        expect(dispatch.getCall(0).args[0].type).to.equal('ADD_STACK');
        expect(dispatch.getCall(1).args[0].type).to.equal('CLEAR_ALL_STACKS');
        expect(stub.getCall(0).args[1]).to.equal(AUTO_ADD_DELAY);
        stub.restore();
      });
    });
  });

  describe('rehydrateStacks', function() {

    describe('when localStorage is undefined', function() {
      it('should do nothing', function() {
        global.localStorage = undefined;
        const dispatch = sinon.spy();
        rehydrateStacks()(dispatch);
        expect(dispatch.callCount).to.equal(0);
      });
    });

    describe('when no persisted data', function() {
      it('should do nothing', function() {
        global.localStorage = {getItem: sinon.stub()};
        const dispatch = sinon.spy();
        rehydrateStacks()(dispatch);
        expect(dispatch.callCount).to.equal(0);
      });
    });

    describe('when persisted data', function() {
      it('should clear/add/search each one', function() {
        global.fetch = createFetchStub();
        const data = ['q1','q2'];
        global.localStorage = {getItem: ()=>JSON.stringify(data)};
        const dispatch = sinon.spy();
        rehydrateStacks()(dispatch);
        expect(dispatch.callCount).to.equal(5);
        expect(dispatch.getCall(0).args[0]).to.be.instanceOf(Function);
        dispatch.getCall(0).args[0](dispatch);
        expect(dispatch.getCall(5).args[0].type).to.equal('CLEAR_ALL_STACKS');
        expect(dispatch.getCall(1).args[0].type).to.equal('ADD_STACK');
        expect(dispatch.getCall(2).args[0]).to.be.instanceOf(Function);
        dispatch.getCall(2).args[0](dispatch);
        expect(dispatch.getCall(6).args[0].type).to.equal('STACK_SEARCH_LOADING');
        expect(dispatch.getCall(3).args[0].type).to.equal('ADD_STACK');
        expect(dispatch.getCall(4).args[0]).to.be.instanceOf(Function);
        dispatch.getCall(4).args[0](dispatch);
        expect(dispatch.getCall(7).args[0].type).to.equal('STACK_SEARCH_LOADING');
        expect(dispatch.callCount).to.equal(8);
        expect(global.fetch.callCount).to.equal(2);
        expect(global.fetch.getCall(0).args[0]).to.equal('/api/search?q=q1');
        expect(global.fetch.getCall(1).args[0]).to.equal('/api/search?q=q2');
        delete global.fetch;
      });
    });
  });
});