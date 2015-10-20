var tabList = [
  { 'id': 1, 'name': 'Home', 'url': '/#/home' },
  { 'id': 2, 'name': 'My Profile', 'url': '/#/profile' },
  { 'id': 3, 'name': 'Company (to be removed from header)', 'url': '/#/company' },
  { 'id': 4, 'name': 'Add Offer', 'url': '/#/addoffer' },
  { 'id': 5, 'name': 'Search Startups', 'url': '/#/searchcompany' },
  { 'id': 6, 'name': 'Login', 'url': '/#/login' },
  { 'id': 7, 'name': 'Signup', 'url': '/#/signup' }
];

var Tab = require('./Tab').Tab;

var Tabs = React.createClass({
  handleClick: function(tab) {
    console.log('Tabs.handleClick');
    this.props.changeTab(tab)
  },
  
  render: function() {
    return (
      <ul>
        { tabList.map(function(tab) {
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
});

module.exports = {
  Tabs: Tabs
}
