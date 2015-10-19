var NavBar = require('./NavbarFrame').NavBar;
var ContentView = require('./ContentFrame').ContentView;
var Tabs = require('./navbar/Tabs').Tabs;

var AppView = React.createClass({

  getInitialState: function() {
    return {
      tablist: Tabs.tabList,
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
