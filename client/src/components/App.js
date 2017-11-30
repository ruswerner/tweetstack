import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import StacksList from './StacksList';
import AddStackButton from './AddStackButton';
import AppHeader from './AppHeader';
import StackRecord from '../records/stack';

export default class App extends PureComponent {

  static propTypes = {
    clearAllStacks: PropTypes.func.isRequired,
    addStack: PropTypes.func.isRequired,
    searchStack: PropTypes.func.isRequired,
    removeStack: PropTypes.func.isRequired,
    refreshStack: PropTypes.func.isRequired,
    onMount: PropTypes.func.isRequired,
    stacks: ImmutablePropTypes.listOf(StackRecord).isRequired
  };

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <AddStackButton
          onClick={this.props.addStack}
        />
        <AppHeader
          onClearAll={this.props.clearAllStacks}
        />
        <StacksList
          stacks={this.props.stacks}
          onRemove={this.props.removeStack}
          onRefresh={this.props.refreshStack}
          onSearch={this.props.searchStack}
        />
      </div>
    );
  }
}
