'use strict';

var tabList = [{ 'id': 1, 'name': 'Home', 'url': '/#/home' }, { 'id': 2, 'name': 'Company View', 'url': '/#/company' }, { 'id': 3, 'name': 'Search', 'url': '/#/search' }, { 'id': 4, 'name': 'Compensation Packages', 'url': '/#/compensation' }];

var AppView = React.createClass({
  displayName: 'AppView',

  render: function render() {
    return React.createElement(
      'div',
      { id: 'app-view' },
      React.createElement(NavBar, { tablist: tabList }),
      React.createElement(ContentView, null)
    );
  }
});

var NavBar = React.createClass({
  displayName: 'NavBar',

  render: function render() {
    return React.createElement(
      'div',
      { id: 'nav-bar' },
      React.createElement(Tabs, { tablist: this.props.tablist })
    );
  }
});

var Tabs = React.createClass({
  displayName: 'Tabs',

  handleClick: function handleClick() {
    this.props.changeTab(tab);
  },

  render: function render() {
    return React.createElement(
      'ul',
      null,
      this.props.tablist.map((function (tab) {
        return React.createElement(Tab, {
          key: tab.id,
          url: tab.url,
          handleClick: this.handleClick.bind(this, tab),
          name: tab.name });
      }).bind(this))
    );
  }
});

var Tab = React.createClass({
  displayName: 'Tab',

  render: function render() {
    return React.createElement(
      'li',
      { className: 'tab' },
      React.createElement(
        'a',
        { href: this.props.url },
        this.props.name
      )
    );
  }
});

var ContentView = React.createClass({
  displayName: 'ContentView',

  render: function render() {
    return React.createElement('div', { id: 'content-view' });
  }
});

ReactDOM.render(React.createElement(AppView, null), document.getElementById('app'));