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
'use strict';

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
        this.props.currentTab === 2 ? React.createElement(
          'div',
          { className: 'company' },
          ' Company Here '
        ) : null
      ),
      React.createElement(
        'div',
        { className: 'content' },
        ' ',
        this.props.currentTab === 3 ? React.createElement(SearchCompany, null) : null
      ),
      React.createElement(
        'div',
        { className: 'content' },
        ' ',
        this.props.currentTab === 4 ? React.createElement(
          'div',
          { className: 'compensation' },
          ' Compensation Here '
        ) : null
      )
    );
  }
});

module.exports = {
  ContentView: ContentView
};

},{"./content/SearchCompany":16}],3:[function(require,module,exports){
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
// var SearchView = React.createClass({
//   render: function() {
//     return (<form><input type="text" value="Hello!" /></form>);
//   };
// });

"use strict";

var Search = React.createClass({
  // getInitialState: function() {
  //   return {value: 'Company Name'}
  // },

  // handleChange: function(event) {
  //   this.setState({value: event.target.value});
  // },

  // render: function() {
  //   var value = this.state.value;
  //   return (<input type="text" onChange={this.props.handleChange} placeholder="asdf" />);
  // }

  displayName: "Search"
});

module.exports = {
  Search: Search
};

},{}],5:[function(require,module,exports){
'use strict';

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

},{"./ContentFrame":2,"./NavbarFrame":3}],6:[function(require,module,exports){


// POST request to server with all info listed above
// update tables: users, offers, companies

// GET request for metrics about the offer
// so we can display the offer results on the page

"use strict";

var EnterOffer = React.createClass({
  // needs a form with:
  // company name
  // dynamic search (like crunchbase)
  // salary (field type: number)
  // equity (type: number (percentage))
  // benefits (type: checkbox)
  // free lunch
  // free dinner
  // healthcare (with dental and eyes?)
  // (am i missing anything?)
  // extra benefits not yet accounted for (type: number)

  // note: in our formula to calculate the value of the offer, we should also include federal and state taxes

  displayName: "EnterOffer"
});

var PostOffer = React.createClass();

module.exports = {
  AddOffer: AddOffer
};

},{}],7:[function(require,module,exports){
"use strict";

// sign up and login form
// oAuth and non-oAuth

// var Auth = React.createClass({
//   render: function() {
//     return ()
//   }
// });

// module.exports = {
//   Auth: Auth
// }

},{}],8:[function(require,module,exports){
"use strict";

// this page will display all the info related to a given company
// see questions here: https://docs.google.com/document/d/1JeDQ7p_NZVoJrM_smjaL2eK1zUoHidwTKYucVkefUgc/edit

},{}],9:[function(require,module,exports){
"use strict";

// this page will display a table of all of a user's 'followed' companies,
// along with the pertinent company data

// above the table we add a search bar that says 'Add a Company'
// GET request for company info
// display info that is returned in the table

},{}],10:[function(require,module,exports){
"use strict";

// this page will display a table of all a user's offers,
// along with the pertinent offer data

// above the table we add a search bar that says 'Add an Offer'
// POST request of offer info
// GET request of any data related to the offer
// display info that is returned in the table

},{}],11:[function(require,module,exports){
"use strict";

// i believe this page will be a subview -- a widget -- that gets embedded on each company page

},{}],12:[function(require,module,exports){
"use strict";

// this is the main landing page; the homepage
// should have info about our value proposition
// cool graphs and charts to entice people to click
// on click, navigate them to the login page

// also include:
// info about each of us
// etc

},{}],13:[function(require,module,exports){
"use strict";

// this is a subview of the UserProfile page.
// it will be a view of all the companies you follow
// only basic data should be displayed bc the user should be able to click on any company and get to their profile

},{}],14:[function(require,module,exports){
"use strict";

// this is a subview of the UserProfile page.
// it will be a view of all the offers the user follows

},{}],15:[function(require,module,exports){
"use strict";

// this is the first page that new users see after they sign up
// it will ask, where are you in your job search?
// just starting
// navigates user to SearchCompany page
// received offers
// navigates user to AddOffer page

},{}],16:[function(require,module,exports){
'use strict';

var libraries = [{ name: 'Backbone.js', url: 'http://documentcloud.github.io/backbone/' }, { name: 'AngularJS', url: 'https://angularjs.org/' }, { name: 'jQuery', url: 'http://jquery.com/' }, { name: 'Prototype', url: 'http://www.prototypejs.org/' }, { name: 'React', url: 'http://facebook.github.io/react/' }, { name: 'Ember', url: 'http://emberjs.com/' }, { name: 'Knockout.js', url: 'http://knockoutjs.com/' }, { name: 'Dojo', url: 'http://dojotoolkit.org/' }, { name: 'Mootools', url: 'http://mootools.net/' }, { name: 'Underscore', url: 'http://documentcloud.github.io/underscore/' }, { name: 'Lodash', url: 'http://lodash.com/' }, { name: 'Moment', url: 'http://momentjs.com/' }, { name: 'Express', url: 'http://expressjs.com/' }, { name: 'Koa', url: 'http://koajs.com/' }];

var SearchCompany = React.createClass({
  displayName: 'SearchCompany',

  getInitialState: function getInitialState() {
    return { searchString: '' };
  },

  handleChange: function handleChange(e) {
    this.setState({ searchString: e.target.value });
  },

  render: function render() {
    // var libraries = this.props.items;
    console.log('test');
    console.log(libraries);
    var searchString = this.state.searchString.trim().toLowerCase();

    console.log('test');
    console.log(searchString);

    if (searchString.length > 0) {
      libraries = libraries.filter(function (l) {
        return l.name.toLowerCase().match(searchString);
      });
    }

    return React.createElement(
      'div',
      null,
      React.createElement('input', { type: 'text', value: this.state.searchString, onChange: this.handleChange, placeholder: 'Search a Company' }),
      React.createElement(
        'ul',
        null,
        libraries.map(function (l) {
          return React.createElement(
            'li',
            { key: libraries.id },
            l.name
          );
        })
      )
    );
  }
});

module.exports = {
  SearchCompany: SearchCompany
};

},{}],17:[function(require,module,exports){
"use strict";

// this page will contain the MyOffers and MyCompanies subviews

},{}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
'use strict';

var tabList = [{ 'id': 1, 'name': 'Home', 'url': '/#/home' }, { 'id': 2, 'name': 'Company View', 'url': '/#/company' }, { 'id': 3, 'name': 'Search', 'url': '/#/search' }, { 'id': 4, 'name': 'Compensation Packages', 'url': '/#/compensation' }];

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

module.exports = {
  Tabs: Tabs
};

},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]);
