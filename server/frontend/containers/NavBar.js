import React, { PropTypes, Component } from 'react';
import Tabs from '../components/Tabs';

export default class NavBar extends Component {
  changeTab(tab) {
    this.props.onTabClick(tab);
  }

  render() {
    return (
      <div id='nav-bar'>
        <Tabs changeTab={this.changeTab.bind(this)} />
      </div>
    );
  }
}

// Tabs.propTypes = {
// };
