import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import SocialMoodBadIcon from 'material-ui/svg-icons/social/mood-bad';
import {red500} from 'material-ui/styles/colors';

export default class StackError extends PureComponent {

  static propTypes = {
    error: PropTypes.string.isRequired
  };

  render() {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        flexDirection: 'column',
        color: red500
      }}>
        <span style={{marginBottom: 8}}>{this.props.error}</span>
        <SocialMoodBadIcon style={{color: red500}}/>
      </div>
    );
  }

}
