import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import StackError from '../StackError';
import renderer from 'react-test-renderer';

describe('StackError', function() {

  it('renders', () => {
    const tree = renderer.create(<MuiThemeProvider><StackError error={'random error'}/></MuiThemeProvider>).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
