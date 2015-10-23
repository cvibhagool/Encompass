import React, { PropTypes, Component } from 'react';
import Tab from './Tab';
import { TabList } from '../constants';

export default class Tabs extends Component {
  handleClick(tab) {
    this.props.changeTab(tab);
  }

  render() {
    return (
      <ul>
        { TabList.map(function(tab) {
          return (
            <Tab 
              key={tab.id} 
              url={tab.url} 
              handleClick={this.handleClick.bind(this, tab)} 
              name={tab.name} />
          );
        }.bind(this))
      }
      </ul>
    );
  }
}
