import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import StackLoading from '../StackLoading';
import renderer from 'react-test-renderer';

jest.mock('material-ui/CircularProgress');

describe('StackLoading', function() {

  it('renders', () => {
    const tree = renderer.create(<MuiThemeProvider><StackLoading/></MuiThemeProvider>).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
