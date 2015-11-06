import React, { PropTypes, Component }  from 'react';
import { TabList }                      from '../constants';
import { Tab, Tabs }                    from 'material-ui';


export default class ETabs extends Component {
  constructor () {
    super();

    //Adds display name for debugging purposes
    this.displayName = 'ETabs';
    this.state = {};
  }

  handleClick(pathToRoute) {
    this.props.changeTab(pathToRoute);
  }

  render() {
    return (
      <div>  
        <Tabs>
          {TabList.map(function(tab) {
            return (
              <Tab
                  key={tab.id} 
                  label={tab.name}
                  onClick={this.handleClick.bind(this, tab.url)}
              />
            );
          }.bind(this))
        }
        </Tabs>
      </div>
    );
  }
}

ETabs.propTypes = {
  changeTab: PropTypes.func.isRequired
}
