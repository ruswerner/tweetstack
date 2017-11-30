import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import {List} from 'material-ui/List';

import StackHeader from './StackHeader';
import StackLoading from './StackLoading';
import StackNoResults from './StackNoResults';
import StackError from './StackError';
import Tweet from './Tweet';

export default class Stack extends PureComponent {

  static propTypes = {
    id: PropTypes.string.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
    tweets: PropTypes.any.isRequired,
    loading: PropTypes.bool.isRequired,
    noResults: PropTypes.bool.isRequired,
    error: PropTypes.string
  };

  renderContent() {
    if (this.props.loading) {
      return <StackLoading/>;
    }

    if (this.props.error) {
      return <StackError error={this.props.error}/>;
    }

    if (this.props.noResults) {
      return <StackNoResults/>;
    }

    return (
      <List>
        {this.props.tweets.map((tweet, i) =>
          <Tweet tweet={tweet} key={i}/>
        )}
      </List>
    );
  }

  render() {

    return (
      <div>
        <Paper style={{
          minWidth: 400,
          maxWidth: 400,
          minHeight: 300,
          marginRight: 15,
          display: 'flex',
          flexDirection: 'column'
        }}
               zDepth={3}>
          <StackHeader
            id={this.props.id}
            query={this.props.query}
            canRefresh={!this.props.loading && this.props.tweets.size > 0}
            loading={this.props.loading}
            onRefresh={this.props.onRefresh}
            onRemove={this.props.onRemove}
            onSearch={this.props.onSearch}/>
          {this.renderContent()}
        </Paper>
      </div>
    );
  }

}
