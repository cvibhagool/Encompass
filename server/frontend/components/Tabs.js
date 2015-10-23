import React, { PropTypes, Component } from 'react';
//import ETab from './Tab';
import { TabList } from '../constants';
import { Tab, Tabs } from 'material-ui';


export default class ETabs extends Component {
  handleClick(tab) {
    this.props.changeTab(tab);
  }

  render() {
    return (
      <div>  
      <Tabs>
        { TabList.map(function(tab) {
          return (
            <Tab 
              key={tab.id} 
              url={tab.url} 
              onClick={this.handleClick.bind(this, tab)} 
              label={tab.name}></Tab>
              
          );
        }.bind(this))
      }
      </Tabs>
      </div>
    );
  }
}
