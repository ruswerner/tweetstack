import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Toolbar} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import NavigationCloseIcon from 'material-ui/svg-icons/navigation/close';
import NavigationRefreshIcon from 'material-ui/svg-icons/navigation/refresh';

export default class StackHeader extends PureComponent {

  static propTypes = {
    id: PropTypes.string.isRequired,
    query: PropTypes.string.isRequired,
    canRefresh: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    onSearch: PropTypes.func.isRequired,
    onRefresh: PropTypes.func,
    onRemove: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      query: props.query,
      focus: false
    };
    this.input = null;
  }

  handleChange = event => this.setState({query: event.target.value});
  handleFocus = () => this.setState({focus: true});
  handleBlur = () => {
    const newQuery = this.state.query.trim();
    if (newQuery.length === 0) {
      this.setState({focus: false, query: this.props.query});
      return;
    }
    if (newQuery !== this.props.query) {
      this.props.onSearch(newQuery);
    }
    this.setState({focus: false});
  };
  handleKey = event => {
    if (event.key === 'Enter' && this.input) {
      this.input.blur();
    }
  };

  componentWillReceiveProps(nextProps) {
    // Reset the state's query if the incoming prop changes
    if (this.props.query !== nextProps.query) {
      this.setState({query: nextProps.query});
    }
  }

  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  componentWillUnmount() {
    this.input = null;
  }

  render() {
    return (
      <Toolbar style={{paddingRight: 0}}>
        <TextField
          id={this.props.id}
          hintText="Search..."
          value={this.state.query}
          disabled={this.props.loading}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKey}
          ref={n => this.input = n}
        />
        <div>
          {!this.state.focus && this.props.canRefresh &&
           <IconButton onClick={this.props.onRefresh}>
             <NavigationRefreshIcon/>
           </IconButton>
          }
          <IconButton onClick={this.props.onRemove}>
            <NavigationCloseIcon/>
          </IconButton>
        </div>
      </Toolbar>
    );
  }

}
