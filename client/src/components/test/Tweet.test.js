import React from 'react';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Tweet from '../Tweet';
import TweetRecord from '../../records/tweet';
import TweetUserRecord from '../../records/tweet-user';

describe('Tweet', function() {

  it('should render', function() {
    const tree = renderer.create(
      <MuiThemeProvider>
        <Tweet
          tweet={new TweetRecord({
            id:'1',
            text:'random text',
            created_at: 'Mon Sep 24 03:35:21 +0000 2012',
            user: new TweetUserRecord({
              name: 'name1',
              screen_name: 'sname1',
              profile_image_url: 'http://_.com/img1.jpg'
            })
          })}
        />
      </MuiThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('when clicked', function() {
    it('should open permalink', function() {
      const spy = jest.spyOn(window, 'open');

      const wrapper = mount(
        <MuiThemeProvider>
          <Tweet
            tweet={new TweetRecord({
              id:'1',
              text:'random text',
              created_at: 'Mon Sep 24 03:35:21 +0000 2012',
              user: new TweetUserRecord({
                name: 'name1',
                screen_name: 'sname1',
                profile_image_url: 'http://_.com/img1.jpg'
              })
            })}
          />
        </MuiThemeProvider>
      );
      wrapper.find('span').first().simulate('click');
      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0]).toEqual('https://twitter.com/statuses/1');

      spy.mockRestore();
    });
  });


});
