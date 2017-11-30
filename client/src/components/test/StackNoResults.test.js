import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import StackNoResults from '../StackNoResults';
import renderer from 'react-test-renderer';

describe('StackNoResults', function() {

  it('renders', () => {
    const tree = renderer.create(<MuiThemeProvider><StackNoResults/></MuiThemeProvider>).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
