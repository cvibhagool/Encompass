(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var tabList = [{ 'id': 1, 'name': 'Home', 'url': '/#/home' }, { 'id': 2, 'name': 'Company View', 'url': '/#/company' }, { 'id': 3, 'name': 'Search', 'url': '/#/search' }, { 'id': 4, 'name': 'Compensation Packages', 'url': '/#/compensation' }];

var NavBar = require('./NavbarFrame').NavBar;
var ContentView = require('./ContentFrame').ContentView;

var AppView = React.createClass({
  displayName: 'AppView',

  getInitialState: function getInitialState() {
    return {
      tablist: tabList,
      currentTab: 1
    };
  },

  changeContent: function changeContent(tab) {
    console.log('AppView.changeContent');
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

ReactDOM.render(React.createElement(AppView, null), document.getElementById('app'));

module.exports = {
  AppView: AppView
};

},{"./ContentFrame":2,"./NavbarFrame":3}],2:[function(require,module,exports){
"use strict";

var ContentView = React.createClass({
  displayName: "ContentView",

  render: function render() {
    return React.createElement(
      "div",
      { id: "content-view" },
      React.createElement(
        "div",
        { className: "content" },
        " ",
        this.props.currentTab === 1 ? React.createElement(
          "div",
          { className: "home" },
          " Home Here "
        ) : null
      ),
      React.createElement(
        "div",
        { className: "content" },
        " ",
        this.props.currentTab === 2 ? React.createElement(
          "div",
          { className: "company" },
          " Company Here "
        ) : null
      ),
      React.createElement(
        "div",
        { className: "content" },
        " ",
        this.props.currentTab === 3 ? React.createElement(
          "div",
          { className: "search" },
          " Search Here "
        ) : null
      ),
      React.createElement(
        "div",
        { className: "content" },
        " ",
        this.props.currentTab === 4 ? React.createElement(
          "div",
          { className: "compensation" },
          " Compensation Here "
        ) : null
      )
    );
  }
});

module.exports = {
  ContentView: ContentView
};

},{}],3:[function(require,module,exports){
'use strict';

var NavBar = React.createClass({
  displayName: 'NavBar',

  changeTab: function changeTab(tab) {
    console.log('Navbar.changeTab');
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
    console.log('Tabs.handleClick');
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

module.exports = {
  NavBar: NavBar,
  Tabs: Tabs,
  Tab: Tab
};

},{}],4:[function(require,module,exports){
"use strict";

},{}]},{},[1,2,3,4]);
