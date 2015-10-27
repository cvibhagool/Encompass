import React, { PropTypes, Component } from 'react';
import ETabs from '../components/Tabs';

export default class NavBar extends Component {
  constructor(props) {

    super(props);

    //Adds display name for debugging purposes
    this.displayName = 'NavBar';
  }

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


NavBar.propTypes = {
  onTabClick: PropTypes.func.isRequired
};
