(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var NavBar = require('./NavbarFrame').NavBar;
var ContentView = require('./ContentFrame').ContentView;
var Tabs = require('./navbar/Tabs').Tabs;

var AppView = React.createClass({
  displayName: 'AppView',

  getInitialState: function getInitialState() {
    return {
      tablist: Tabs.tabList,
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

module.exports = {
  AppView: AppView
};

},{"./ContentFrame":2,"./NavbarFrame":3,"./navbar/Tabs":9}],2:[function(require,module,exports){
'use strict';

var UserProfile = require('./content/UserProfile').UserProfile;
var AddOffer = require('./content/AddOffer').AddOffer;
var SearchCompany = require('./content/SearchCompany').SearchCompany;

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
          ' Home Here '
        ) : null
      ),
      React.createElement(
        'div',
        { className: 'content' },
        ' ',
        this.props.currentTab === 2 ? React.createElement(UserProfile, null) : null
      ),
      React.createElement(
        'div',
        { className: 'content' },
        ' ',
        this.props.currentTab === 3 ? React.createElement(AddOffer, null) : null
      ),
      React.createElement(
        'div',
        { className: 'content' },
        ' ',
        this.props.currentTab === 4 ? React.createElement(SearchCompany, null) : null
      ),
      React.createElement(
        'div',
        { className: 'content' },
        ' ',
        this.props.currentTab === 5 ? React.createElement(Login, null) : null
      ),
      React.createElement(
        'div',
        { className: 'content' },
        ' ',
        this.props.currentTab === 6 ? React.createElement(Signup, null) : null
      )
    );
  }
});

module.exports = {
  ContentView: ContentView
};

},{"./content/AddOffer":5,"./content/SearchCompany":6,"./content/UserProfile":7}],3:[function(require,module,exports){
'use strict';

var Tabs = require('./navbar/Tabs').Tabs;

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
      React.createElement(Tabs, { changeTab: this.changeTab })
    );
  }
});

module.exports = {
  NavBar: NavBar
};

},{"./navbar/Tabs":9}],4:[function(require,module,exports){
'use strict';

var AppView = require('./AppFrame').AppView;

ReactDOM.render(React.createElement(AppView, null), document.getElementById('app'));

},{"./AppFrame":1}],5:[function(require,module,exports){


// POST request to server with all info listed above
// update tables: users, offers, companies

// GET request for metrics about the offer
// so we can display the offer results on the page

"use strict";

var AddOffer = React.createClass({
  displayName: "AddOffer",

  render: function render() {
    return React.createElement(
      "form",
      { className: "offerForm" },
      "Startup: ",
      React.createElement("input", { type: "text", placeholder: "Which Startup?" }),
      "Salary: ",
      React.createElement("input", { type: "number" }),
      "Equity: ",
      React.createElement("input", { type: "number" }),
      "Benefits:",
      React.createElement("input", { type: "checkbox", name: "food" }),
      "Free Food",
      React.createElement("input", { type: "checkbox", name: "healthcare" }),
      "Free Healthcare Other Benefits: ",
      React.createElement("input", { type: "number" }),
      React.createElement("input", { type: "submit", value: "Post" })
    );
  }
});

// var PostOffer = React.createClass()

// note: in our formula to calculate the value of the offer, we should also include federal and state taxes

module.exports = {
  AddOffer: AddOffer
};

},{}],6:[function(require,module,exports){
// react does not regenerate the list items when the user deletes/retypes their search

"use strict";

var SearchCompany = React.createClass({
  displayName: "SearchCompany",

  // initial state of search box will be blank
  getInitialState: function getInitialState() {
    return { searchString: '' };
  },

  // without handleChange, the default search box text will never change
  handleChange: function handleChange(e) {
    this.setState({ searchString: e.target.value });
  },

  //
  render: function render() {
    // this next line was in the tut but it seems to break things
    // http://tutorialzine.com/2014/07/5-practical-examples-for-learning-facebooks-react-framework/

    // var companies = this.props.companies;

    var searchString = this.state.searchString.trim().toLowerCase();

    // as soon as user starts to type, filter the results
    if (searchString.length > 0) {
      companies = companies.filter(function (l) {
        return l.name.toLowerCase().match(searchString);
      });
    }

    // search box + display the list of companies below the search box
    return React.createElement(
      "div",
      null,
      React.createElement("input", { type: "text",
        value: this.state.searchString,
        onChange: this.handleChange,
        placeholder: "Search a Company" }),
      React.createElement(
        "ul",
        null,
        "// !! React yells that each child (li item) should have a unique key prop // but I already did include one here so I'm not sure whats wrong",
        companies.map(function (lib) {
          return React.createElement(
            "li",
            { key: lib.id },
            lib.name
          );
        })
      )
    );
  }
});

// here is where we store our company names for realtime search
var companies = [{ name: 'Backbone.js', url: 'http://documentcloud.github.io/backbone/' }, { name: 'AngularJS', url: 'https://angularjs.org/' }, { name: 'jQuery', url: 'http://jquery.com/' }, { name: 'Prototype', url: 'http://www.prototypejs.org/' }, { name: 'React', url: 'http://facebook.github.io/react/' }, { name: 'Ember', url: 'http://emberjs.com/' }, { name: 'Knockout.js', url: 'http://knockoutjs.com/' }, { name: 'Dojo', url: 'http://dojotoolkit.org/' }, { name: 'Mootools', url: 'http://mootools.net/' }, { name: 'Underscore', url: 'http://documentcloud.github.io/underscore/' }, { name: 'Lodash', url: 'http://lodash.com/' }, { name: 'Moment', url: 'http://momentjs.com/' }, { name: 'Express', url: 'http://expressjs.com/' }, { name: 'Koa', url: 'http://koajs.com/' }];

module.exports = {
  SearchCompany: SearchCompany
};

},{}],7:[function(require,module,exports){
// this page will contain the MyOffers and MyCompanies subviews

"use strict";

var UserProfile = React.createClass({
  displayName: "UserProfile",

  render: function render() {
    return React.createElement(
      "div",
      null,
      "UserProfile Test"
    );
  }

});

module.exports = {
  UserProfile: UserProfile
};

},{}],8:[function(require,module,exports){
'use strict';

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
  Tab: Tab
};

},{}],9:[function(require,module,exports){
'use strict';

var tabList = [{ 'id': 1, 'name': 'Home', 'url': '/#/home' }, { 'id': 2, 'name': 'My Profile', 'url': '/#/profile' }, { 'id': 3, 'name': 'Add Offer', 'url': '/#/addoffer' }, { 'id': 4, 'name': 'Search Startups', 'url': '/#/searchcompany' }, { 'id': 5, 'name': 'Login', 'url': '/#/login' }, { 'id': 6, 'name': 'Signup', 'url': '/#/signup' }];

var Tab = require('./Tab').Tab;

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
      tabList.map((function (tab) {
        return React.createElement(Tab, {
          key: tab.id,
          url: tab.url,
          handleClick: this.handleClick.bind(this, tab),
          name: tab.name });
      }).bind(this))
    );
  }
});

module.exports = {
  Tabs: Tabs
};

},{"./Tab":8}]},{},[4]);
