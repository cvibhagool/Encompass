var NavBar = require('./NavbarFrame').NavBar;
var ContentFrame = require('./ContentFrame').ContentFrame;
var Tabs = require('./navbar/Tabs').Tabs;

var AppView = React.createClass({

  getInitialState: function() {
    return {
      currentTab: 1,
      currentCompany: null,
    };
  },

  changeContent: function(tab) {
    console.log('AppView.changeContent');
    this.setState({ currentTab: tab.id });
  },

  changeCompany: function(id) {
    console.log('AppView.changeCompany');
    this.setState({ currentCompany: id, currentTab: 3 });
  },

  render: function() {
    return (
      <div id='app-view'>
        <NavBar tablist={Tabs.tabList} changeContent={this.changeContent} />
        <ContentFrame changeCompany={this.changeCompany} currentCompany={this.state.currentCompany} currentTab={this.state.currentTab} />
      </div>
    );
  }
});

module.exports = {
  AppView: AppView
}
