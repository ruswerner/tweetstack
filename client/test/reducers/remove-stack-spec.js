import Immutable from 'immutable';
import {expect} from 'chai';
import StackRecord from '../../src/records/stack';
import removeStack from '../../src/reducers/remove-stack';

describe('removeStack', function() {

  describe('when stack at index exists', function() {
    it('should remove the stack at index', function() {
      const state = new Immutable.List([new StackRecord()]);
      const newState = removeStack(state, {index: 0});
      expect(newState.size).to.equal(0);
    });
  });

  describe('when stack at index does not exist', function() {
    it('should do nothing', function() {
      const state = new Immutable.List([new StackRecord()]);
      const newState = removeStack(state, {index: 1});
      expect(newState.size).to.equal(1);
      expect(newState).to.equal(state);
    });
  });

});