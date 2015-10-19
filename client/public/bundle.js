(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var NavBar = require('./NavbarFrame').NavBar;
var ContentView = require('./ContentFrame').ContentView;
var Tabs = require('./navbar/Tabs').Tabs;

var AppView = React.createClass({displayName: "AppView",

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
      React.createElement("div", {id: "app-view"}, 
        React.createElement(NavBar, {tablist: this.state.tablist, changeContent: this.changeContent}), 
        React.createElement(ContentView, {currentTab: this.state.currentTab})
      )
    );
  }
});

module.exports = {
  AppView: AppView
}

},{"./ContentFrame":2,"./NavbarFrame":3,"./navbar/Tabs":7}],2:[function(require,module,exports){
var SearchCompany = require('./content/SearchCompany').SearchCompany;

var ContentView = React.createClass({displayName: "ContentView",
  render: function() {
    return (
      React.createElement("div", {id: "content-view"}, 
        React.createElement("div", {className: "content"}, " ", this.props.currentTab === 1 ? React.createElement("div", {className: "home"}, " Home Here ") : null), 
        React.createElement("div", {className: "content"}, " ", this.props.currentTab === 2 ? React.createElement(UserProfile, null) : null), 
        React.createElement("div", {className: "content"}, " ", this.props.currentTab === 3 ? React.createElement(AddOffer, null) : null), 
        React.createElement("div", {className: "content"}, " ", this.props.currentTab === 4 ? React.createElement(SearchCompany, null) : null), 
        React.createElement("div", {className: "content"}, " ", this.props.currentTab === 5 ? React.createElement(Login, null) : null), 
        React.createElement("div", {className: "content"}, " ", this.props.currentTab === 6 ? React.createElement(Signup, null) : null)
      )
    );
  }
});

module.exports = {
  ContentView: ContentView
}

},{"./content/SearchCompany":5}],3:[function(require,module,exports){
var Tabs = require('./navbar/Tabs').Tabs;

var NavBar = React.createClass({displayName: "NavBar",
  changeTab: function(tab) {
    console.log('Navbar.changeTab');
    this.props.changeContent(tab);
  },

  render: function() {
    return (
      React.createElement("div", {id: "nav-bar"}, 
        React.createElement(Tabs, {changeTab: this.changeTab})
      )
    );
  }
});

module.exports = {
  NavBar: NavBar
}

},{"./navbar/Tabs":7}],4:[function(require,module,exports){
var AppView = require('./AppFrame').AppView;

ReactDOM.render(React.createElement(AppView, null), document.getElementById('app'));

},{"./AppFrame":1}],5:[function(require,module,exports){
// react does not regenerate the list items when the user deletes/retypes their search

var SearchCompany = React.createClass({displayName: "SearchCompany",

  // initial state of search box will be blank
  getInitialState: function() {
    return { searchString: ''};
  },

  // without handleChange, the default search box text will never change
  handleChange: function(e) {
    this.setState({searchString: e.target.value});

  },

  //
  render: function() {
    // this next line was in the tut but it seems to break things
    // http://tutorialzine.com/2014/07/5-practical-examples-for-learning-facebooks-react-framework/

    // var companies = this.props.companies;

    var searchString = this.state.searchString.trim().toLowerCase();
    
    // as soon as user starts to type, filter the results
    if (searchString.length > 0) {
      companies = companies.filter(function(l) {
        return l.name.toLowerCase().match(searchString);
      });
    }

    // search box + display the list of companies below the search box 
    return React.createElement("div", null, 
      React.createElement("input", {type: "text", 
        value: this.state.searchString, 
        onChange: this.handleChange, 
        placeholder: "Search a Company"}), 

      React.createElement("ul", null, 
        "// !! React yells that each child (li item) should have a unique key prop" + ' ' +
        "// but I already did include one here so I'm not sure whats wrong", 
        companies.map(function(lib) {
          return React.createElement("li", {key: lib.id}, lib.name)
        })
      )
    )
  }
});

// here is where we store our company names for realtime search
var companies = [
    { name: 'Backbone.js', url: 'http://documentcloud.github.io/backbone/'},
    { name: 'AngularJS', url: 'https://angularjs.org/'},
    { name: 'jQuery', url: 'http://jquery.com/'},
    { name: 'Prototype', url: 'http://www.prototypejs.org/'},
    { name: 'React', url: 'http://facebook.github.io/react/'},
    { name: 'Ember', url: 'http://emberjs.com/'},
    { name: 'Knockout.js', url: 'http://knockoutjs.com/'},
    { name: 'Dojo', url: 'http://dojotoolkit.org/'},
    { name: 'Mootools', url: 'http://mootools.net/'},
    { name: 'Underscore', url: 'http://documentcloud.github.io/underscore/'},
    { name: 'Lodash', url: 'http://lodash.com/'},
    { name: 'Moment', url: 'http://momentjs.com/'},
    { name: 'Express', url: 'http://expressjs.com/'},
    { name: 'Koa', url: 'http://koajs.com/'},
];

module.exports = {
  SearchCompany: SearchCompany
}

},{}],6:[function(require,module,exports){
var Tab = React.createClass({displayName: "Tab",
  handleClick: function(e){
    e.preventDefault();
    this.props.handleClick();
  },

  render: function() {
    return (React.createElement("li", {className: "tab"}, React.createElement("a", {href: this.props.url, onClick: this.handleClick}, this.props.name)));
  }
});

module.exports = {
  Tab: Tab
}

},{}],7:[function(require,module,exports){
var tabList = [
  { 'id': 1, 'name': 'Home', 'url': '/#/home' },
  { 'id': 2, 'name': 'My Profile', 'url': '/#/profile' },
  { 'id': 3, 'name': 'Add Offer', 'url': '/#/addoffer' },
  { 'id': 4, 'name': 'Search Startups', 'url': '/#/searchcompany' },
  { 'id': 5, 'name': 'Login', 'url': '/#/login' },
  { 'id': 6, 'name': 'Signup', 'url': '/#/signup' }
];

var Tab = require('./Tab').Tab;


var Tabs = React.createClass({displayName: "Tabs",
  handleClick: function(tab) {
    console.log('Tabs.handleClick');
    this.props.changeTab(tab)
  },
  
  render: function() {
    return (
      React.createElement("ul", null, 
         tabList.map(function(tab) {
          return (
            React.createElement(Tab, {
              key: tab.id, 
              url: tab.url, 
              handleClick: this.handleClick.bind(this, tab), 
              name: tab.name})
          );
        }.bind(this))
      
      )
    );
  }
});

module.exports = {
  Tabs: Tabs
}

},{"./Tab":6}]},{},[4]);
