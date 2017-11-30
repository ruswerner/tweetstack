import React from 'react';
import Immutable from 'immutable';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import StacksList from '../StacksList';
import StackRecord from '../../records/stack';

const noop = () => null;

describe('StacksList', function() {

  describe('when no stacks', function() {
    it('should match snapshot', function() {
      const tree = renderer.create(
        <MuiThemeProvider>
          <StacksList
            stacks={new Immutable.List()}
            onRefresh={noop}
            onRemove={noop}
            onSearch={noop}
          />
        </MuiThemeProvider>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when 1 stack', function() {
    it('should match snapshot', function() {
      const tree = renderer.create(
        <MuiThemeProvider>
          <StacksList
            stacks={new Immutable.List([new StackRecord()])}
            onRefresh={noop}
            onRemove={noop}
            onSearch={noop}
          />
        </MuiThemeProvider>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

});
