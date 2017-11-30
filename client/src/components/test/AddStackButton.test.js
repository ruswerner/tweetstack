import React from 'react';
import sinon from 'sinon';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AddStackButton from '../AddStackButton';

describe('AddStackButton', function() {

  it('renders the button', () => {
    const tree = renderer.create(
      <MuiThemeProvider>
        <AddStackButton onClick={() => null}/>
      </MuiThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('when button is clicked', function() {
    it('should call onClick', function() {
      const onClick = sinon.spy();
      const wrapper = mount(
        <MuiThemeProvider>
          <AddStackButton onClick={onClick}/>
        </MuiThemeProvider>
      );
      wrapper.find('button').simulate('click');
      expect(onClick.callCount).toEqual(1);
    });
  });

});