import React, { PropTypes, Component }  from 'react';
import {Tab}                            from 'material-ui';

export default class ETab extends Component {
  handleClick(tab) {
    this.props.handleClick();
  }

  render() {
    return (<Tab className='tab'><a href={this.props.url} onClick={this.handleClick.bind(this)}>{this.props.name}</a></Tab>);
  }
}
