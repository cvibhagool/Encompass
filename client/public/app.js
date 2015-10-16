'use strict';

var tabList = [{ 'id': 1, 'name': 'Home', 'url': '/#/home' }, { 'id': 2, 'name': 'Company View', 'url': '/#/company' }, { 'id': 3, 'name': 'Search', 'url': '/#/search' }, { 'id': 4, 'name': 'Compensation Packages', 'url': '/#/compensation' }];

var AppView = React.createClass({
  displayName: 'AppView',

  getInitialState: function getInitialState() {
    return {
      tablist: tabList,
      currentTab: 1
    };
  },

  changeContent: function changeContent(tab) {
    console.log('Changing content');
    this.setState({ currentTab: tab.id });
  },

  render: function render() {
    return React.createElement(
      'div',
      { id: 'app-view' },
      React.createElement(NavBar, { tablist: this.state.tablist, changeContent: this.changeContent }),
      React.createElement(ContentView, { currentTab: this.state.currentTab })
    );
  }
});

var NavBar = React.createClass({
  displayName: 'NavBar',

  changeTab: function changeTab(tab) {
    console.log('Changing tab');
    this.props.changeContent(tab);
  },

  render: function render() {
    return React.createElement(
      'div',
      { id: 'nav-bar' },
      React.createElement(Tabs, { tablist: this.props.tablist, changeTab: this.changeTab })
    );
  }
});

var Tabs = React.createClass({
  displayName: 'Tabs',

  handleClick: function handleClick(tab) {
    console.log('Handling click');
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

  handleClick: function handleClick(e) {
    e.preventDefault();
    this.props.handleClick();
  },

  render: function render() {
    return React.createElement(
      'li',
      { className: 'tab' },
      React.createElement(
        'a',
        { href: this.props.url, onClick: this.handleClick },
        this.props.name
      )
    );
  }
});

var ContentView = React.createClass({
  displayName: 'ContentView',

  render: function render() {
    return React.createElement(
      'div',
      { id: 'content-view' },
      React.createElement(
        'div',
        { className: 'content' },
        ' ',
        this.props.currentTab === 1 ? React.createElement(
          'div',
          { className: 'home' },
          ' Stuff Here '
        ) : null
      )
    );
  }
});

ReactDOM.render(React.createElement(AppView, null), document.getElementById('app'));