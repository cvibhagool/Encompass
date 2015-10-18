var tabList = [
  { 'id': 1, 'name': 'Home', 'url': '/#/home' },
  { 'id': 2, 'name': 'Company View', 'url': '/#/company' },
  { 'id': 3, 'name': 'Search', 'url': '/#/search' },
  { 'id': 4, 'name': 'Compensation Packages', 'url': '/#/compensation' }
];

var Tabs = React.createClass({
  handleClick: function(tab) {
    console.log('Tabs.handleClick');
    this.props.changeTab(tab)
  },
  
  render: function() {
    return (
      <ul>
        { this.props.tablist.map(function(tab) {
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
