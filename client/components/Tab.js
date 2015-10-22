import React, { PropTypes, Component } from 'react';

export default class Tab extends Component {
  handleClick(tab) {
    this.props.handleClick();
  }

  render() {
    return (<li className='tab'><a href={this.props.url} onClick={this.handleClick.bind(this)}>{this.props.name}</a></li>);
  }
}

// Tabs.propTypes = {
// };
