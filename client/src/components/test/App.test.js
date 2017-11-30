import React from 'react';
import Immutable from 'immutable';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from '../App';
import StackRecord from '../../records/stack';

const noop = () => null;

describe('App', function() {

  it('should rehydrate on mount', function() {
    const rehydrate = sinon.spy();
    renderer.create(
      <MuiThemeProvider>
        <App
          clearAllStacks={noop}
          addStack={noop}
          searchStack={noop}
          removeStack={noop}
          refreshStack={noop}
          onMount={rehydrate}
          stacks={new Immutable.List()}
        />
      </MuiThemeProvider>
    );
    expect(rehydrate.callCount).toEqual(1);
  });

  describe('when no stacks', function() {
    it('should match snapshot', function() {
      const tree = renderer.create(
        <MuiThemeProvider>
          <App
            clearAllStacks={noop}
            addStack={noop}
            searchStack={noop}
            removeStack={noop}
            refreshStack={noop}
            onMount={noop}
            stacks={new Immutable.List()}
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
          <App
            clearAllStacks={noop}
            addStack={noop}
            searchStack={noop}
            removeStack={noop}
            refreshStack={noop}
            onMount={noop}
            stacks={new Immutable.List([new StackRecord()])}
          />
        </MuiThemeProvider>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

});
