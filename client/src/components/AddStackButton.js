import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAddIcon from 'material-ui/svg-icons/content/add';

export default class AddStackButton extends PureComponent {

  static propTypes = {
    onClick: PropTypes.func.isRequired
  };

  render() {
    return (
      <FloatingActionButton onClick={this.props.onClick}
                            secondary={true}
                            style={{
                              position: 'fixed',
                              right: 24,
                              bottom: 24,
                              zIndex: 1000
                            }}>
        <ContentAddIcon/>
      </FloatingActionButton>
    );
  }

}
