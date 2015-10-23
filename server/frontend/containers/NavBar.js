import React, { PropTypes, Component } from 'react';
import ETabs from '../components/Tabs';

export default class NavBar extends Component {
  changeTab(tab) {
    this.props.onTabClick(tab);
  }

  render() {
    return (
      <div id='nav-bar'>
        <ETabs changeTab={this.changeTab.bind(this)} />
      </div>
    );
  }
}

