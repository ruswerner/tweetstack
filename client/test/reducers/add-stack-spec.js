import Immutable from 'immutable';
import {expect} from 'chai';
import StackRecord from '../../src/records/stack';
import addStack from '../../src/reducers/add-stack';

describe('addStack', function() {
  it('should add a new empty stack', function() {
    const state = new Immutable.List();
    const newState = addStack(state);
    expect(newState.size).to.equal(1);
    expect(newState.get(0)).to.be.instanceOf(StackRecord);
    expect(newState.get(0).toJSON()).to.eql((new StackRecord()).toJSON());
  });
});