import React, {PureComponent} from 'react';
import SocialMoodBadIcon from 'material-ui/svg-icons/social/mood-bad';

export default class StackNoResults extends PureComponent {

  render() {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        flexDirection: 'column'
      }}>
        <span style={{marginBottom: 8}}>No tweets found.</span>
        <SocialMoodBadIcon/>
      </div>
    );
  }

}
