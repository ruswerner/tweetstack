import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppHeader from '../AppHeader';

const noop = () => null;

describe('AppHeader', function() {

  describe('when button is clicked', function() {
    it('should call onClearAll', function() {
      const onClearAll = sinon.spy();
      const wrapper = mount(
        <MuiThemeProvider>
          <AppHeader onClearAll={onClearAll}/>
        </MuiThemeProvider>
      );
      wrapper.find('button[id="clear-all"]').simulate('click');
      expect(onClearAll.callCount).toEqual(1);
    });
  });

  it('should match snapshot', function() {
    const tree = renderer.create(
      <MuiThemeProvider>
        <AppHeader onClearAll={noop}/>
      </MuiThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
