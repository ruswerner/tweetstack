import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Logo from './Logo';

export default class AppHeader extends PureComponent {

  static propTypes = {
    onClearAll: PropTypes.func.isRequired
  };

  render() {
    return (
      <AppBar title="TWEETSTACK"
              iconElementLeft={<Logo/>}
              iconElementRight={<FlatButton id="clear-all" label="Clear All" onClick={this.props.onClearAll}/>}
              style={{flexShrink: 0}}
      />
    );
  }

}
