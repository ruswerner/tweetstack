import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import StackHeader from '../StackHeader';
import renderer from 'react-test-renderer';

const noop=()=>null;

describe('StackHeader', function() {

  it('renders', () => {
    const tree = renderer.create(
      <MuiThemeProvider>
        <StackHeader
          id="1"
          query="q1"
          canRefresh={false}
          loading={false}
          onSearch={noop}
          onRefresh={noop}
          onRemove={noop}
        />
      </MuiThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders canRefresh', () => {
    const tree = renderer.create(
      <MuiThemeProvider>
        <StackHeader
          id="1"
          query="q1"
          canRefresh={true}
          loading={false}
          onSearch={noop}
          onRefresh={noop}
          onRemove={noop}
        />
      </MuiThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders loading', () => {
    const tree = renderer.create(
      <MuiThemeProvider>
        <StackHeader
          id="1"
          query="q1"
          canRefresh={false}
          loading={true}
          onSearch={noop}
          onRefresh={noop}
          onRemove={noop}
        />
      </MuiThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders canRefresh & loading', () => {
    const tree = renderer.create(
      <MuiThemeProvider>
        <StackHeader
          id="1"
          query="q1"
          canRefresh={true}
          loading={true}
          onSearch={noop}
          onRefresh={noop}
          onRemove={noop}
        />
      </MuiThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
