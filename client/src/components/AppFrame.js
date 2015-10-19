var tabList = [
  { 'id': 1, 'name': 'Home', 'url': '/#/home' },
  { 'id': 2, 'name': 'My Profile', 'url': '/#/profile' },
  { 'id': 3, 'name': 'Add Offer', 'url': '/#/addoffer' },
  { 'id': 4, 'name': 'Search Startups', 'url': '/#/searchcompany' },
  { 'id': 5, 'name': 'Login', 'url': '/#/login' },
  { 'id': 6, 'name': 'Signup', 'url': '/#/signup' }
];

var NavBar = require('./NavbarFrame').NavBar;

var ContentView = require('./ContentFrame').ContentView;

var AppView = React.createClass({

  getInitialState: function() {
    return {
      tablist: tabList,
      currentTab: 1
    };
  },

  changeContent: function(tab) {
    console.log('AppView.changeContent');
    this.setState({ currentTab: tab.id });
  },

  render: function() {
    return (
      <div id='app-view'>
        <NavBar tablist={this.state.tablist} changeContent={this.changeContent} />
        <ContentView currentTab={this.state.currentTab} />
      </div>
    );
  }
});

ReactDOM.render(<AppView/>, document.getElementById('app'));

module.exports = {
  AppView: AppView
}
