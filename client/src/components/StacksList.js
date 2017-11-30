import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Stack from './Stack';
import StackRecord from '../records/stack';

export default class StacksList extends PureComponent {

  static propTypes = {
    stacks: ImmutablePropTypes.listOf(StackRecord).isRequired,
    onRefresh: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.scroll = null;
  }

  componentDidUpdate(prevProps) {
    // If a new stack was added and there are at least 2 stacks, auto-scroll the new stack into view
    if (prevProps.stacks.size < this.props.stacks.size && this.props.stacks.size > 1) {
      this.scroll.scrollLeft = this.scroll.scrollWidth;
    }
  }

  componentWillUnmount() {
    this.scroll = null;
  }

  render() {

    const justifyContent = this.props.stacks.size === 1 ?
      'center' :
      'flex-start';

    return (
      <div style={{overflow: 'scroll'}}
           ref={n => this.scroll = n}>
        <div style={{
          padding: 15,
          paddingBottom: 30,
          display: 'flex',
          flexDirection: 'row',
          justifyContent
        }}>
          {this.props.stacks.map((stack, i) =>
            <Stack
              key={`${stack.query}${i}`}
              id={`stack${i}`}
              onRefresh={() => this.props.onRefresh(i)}
              onRemove={() => this.props.onRemove(i)}
              onSearch={q => this.props.onSearch(i, q)}
              query={stack.query}
              tweets={stack.tweets}
              loading={stack.loading}
              noResults={stack.noResults}
              error={stack.error}
            />)
          }
        </div>
      </div>
    );
  }

}
