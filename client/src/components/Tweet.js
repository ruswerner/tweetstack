import React, {PureComponent} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import TweetRecord from '../records/tweet';

export default class Tweet extends PureComponent {

  static propTypes = {
    tweet: PropTypes.instanceOf(TweetRecord).isRequired
  };

  render() {

    const {id, text, user, created_at} = this.props.tweet;

    const ago = moment(new Date(created_at)).fromNow();

    return (
      <ListItem
        onClick={() =>
          window.open(`https://twitter.com/statuses/${id}`)
        }
        leftAvatar={<Avatar src={user.profile_image_url}/>}
        rightIcon={<span>{ago}</span>}
        primaryText={user.name}
        secondaryText={
          /* Tweet text can contain encoded html entities, so this makes it readable.
             ...and we trust that twitter has sanitised the content */
          <div style={{height: 'auto', WebkitLineClamp: 'unset'}} dangerouslySetInnerHTML={{__html: text}}/>
        }
        secondaryTextLines={2}
      >
      </ListItem>
    );
  }

}
