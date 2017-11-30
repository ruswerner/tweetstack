import React, {PureComponent} from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default class StackLoading extends PureComponent {

  render() {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        flexDirection: 'column'
      }}>
        <CircularProgress/>
        <span style={{marginTop: 16}}>Finding tweets...</span>
      </div>
    );
  }

}
