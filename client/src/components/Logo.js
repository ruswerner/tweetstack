import React, {PureComponent} from 'react';
import IconButton from 'material-ui/IconButton';
import AVEqualizerIcon from 'material-ui/svg-icons/av/equalizer';

export default class Logo extends PureComponent {
  render() {
    return (
      <IconButton disableTouchRipple={true}
                  style={{transform: 'rotate(180deg)'}}
                  onClick={() => window.open('https://github.com/ruswerner/tweetstack')}>
        <AVEqualizerIcon color="white"/>
      </IconButton>
    );
  }
}
