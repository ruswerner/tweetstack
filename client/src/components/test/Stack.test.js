import React from 'react';
import Immutable from 'immutable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Stack from '../Stack';
import renderer from 'react-test-renderer';
import TweetRecord from '../../records/tweet';
import TweetUserRecord from '../../records/tweet-user';

jest.mock('material-ui/CircularProgress');

const noop = ()=>null;

describe('Stack', function() {

  it('renders tweets', () => {

    const tweets = new Immutable.List([
      new TweetRecord({
        id: '1',
        text: 'tweet1',
        created_at: new Date(),
        user: new TweetUserRecord({
          name: 'user1',
          profile_image_url: 'http://_.com/img1.jpg'
        })
      }),
      new TweetRecord({
        id: '2',
        text: 'tweet2',
        created_at: new Date(),
        user: new TweetUserRecord({
          name: 'user2',
          profile_image_url: 'http://_.com/img2.jpg'
        })
      }),
    ]);
    const tree = renderer.create(
      <MuiThemeProvider>
        <Stack
          id={'1'}
          onRefresh={noop}
          onRemove={noop}
          onSearch={noop}
          query={'q1'}
          tweets={tweets}
          loading={false}
          noResults={false}
          error={undefined}
        />
      </MuiThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders empty', function() {
    const tree = renderer.create(
      <MuiThemeProvider>
        <Stack
          id={'2'}
          onRefresh={noop}
          onRemove={noop}
          onSearch={noop}
          query={'q2'}
          tweets={new Immutable.List()}
          loading={false}
          noResults={false}
          error={undefined}
        />
      </MuiThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders loading', function() {
    const tree = renderer.create(
      <MuiThemeProvider>
        <Stack
          id={'2'}
          onRefresh={noop}
          onRemove={noop}
          onSearch={noop}
          query={'q2'}
          tweets={new Immutable.List()}
          loading={true}
          noResults={false}
          error={undefined}
        />
      </MuiThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders error', function() {
    const tree = renderer.create(
      <MuiThemeProvider>
        <Stack
          id={'3'}
          onRefresh={noop}
          onRemove={noop}
          onSearch={noop}
          query={'q3'}
          tweets={new Immutable.List()}
          loading={false}
          noResults={false}
          error={'random error'}
        />
      </MuiThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders no results', function() {
    const tree = renderer.create(
      <MuiThemeProvider>
        <Stack
          id={'4'}
          onRefresh={noop}
          onRemove={noop}
          onSearch={noop}
          query={'q4'}
          tweets={new Immutable.List()}
          loading={false}
          noResults={true}
          error={undefined}
        />
      </MuiThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
