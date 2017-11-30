import Immutable from 'immutable';
import {expect} from 'chai';
import sinon from 'sinon';
import persistState from '../../src/middleware/persist-state';
import StackRecord from '../../src/records/stack';

describe('persistState', function() {

  it('should persist queries to localStorage', function() {
    global.localStorage = {
      setItem: sinon.spy()
    };
    const store = {
      getState: ()=>({
        stacks: new Immutable.List([new StackRecord({query:'q1'})])
      })
    };
    const next = sinon.spy();
    const action = Symbol();

    persistState(store)(next)(action);

    expect(next.callCount).to.equal(1);
    expect(next.getCall(0).args[0]).to.equal(action);

    expect(global.localStorage.setItem.callCount).to.equal(1);
    expect(global.localStorage.setItem.getCall(0).args[0]).to.equal('stackQueries');
    expect(global.localStorage.setItem.getCall(0).args[1]).to.equal(JSON.stringify(['q1']));

    delete global.localStorage;
  });

});