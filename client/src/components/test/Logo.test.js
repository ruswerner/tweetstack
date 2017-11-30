import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Logo from '../Logo';
import renderer from 'react-test-renderer';

describe('Logo', function() {

  it('renders the logo', () => {
    const tree = renderer.create(<MuiThemeProvider><Logo/></MuiThemeProvider>).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
