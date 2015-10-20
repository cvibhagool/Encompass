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

},{"./ContentFrame":2,"./NavbarFrame":3,"./navbar/Tabs":10}],2:[function(require,module,exports){
'use strict';

var UserProfile = require('./content/UserProfile').UserProfile;
var AddOffer = require('./content/AddOffer').AddOffer;
var SearchCompany = require('./content/SearchCompany').SearchCompany;
var CompanyProfile = require('./content/CompanyProfile').CompanyProfile;

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
        this.props.currentTab === 3 ? React.createElement(CompanyProfile, null) : null
      ),
      React.createElement(
        'div',
        { className: 'content' },
        ' ',
        this.props.currentTab === 4 ? React.createElement(AddOffer, null) : null
      ),
      React.createElement(
        'div',
        { className: 'content' },
        ' ',
        this.props.currentTab === 5 ? React.createElement(SearchCompany, null) : null
      ),
      React.createElement(
        'div',
        { className: 'content' },
        ' ',
        this.props.currentTab === 6 ? React.createElement(Login, null) : null
      ),
      React.createElement(
        'div',
        { className: 'content' },
        ' ',
        this.props.currentTab === 7 ? React.createElement(Signup, null) : null
      )
    );
  }
});

module.exports = {
  ContentView: ContentView
};

},{"./content/AddOffer":5,"./content/CompanyProfile":6,"./content/SearchCompany":7,"./content/UserProfile":8}],3:[function(require,module,exports){
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

},{"./navbar/Tabs":10}],4:[function(require,module,exports){
'use strict';

var AppView = require('./AppFrame').AppView;

ReactDOM.render(React.createElement(AppView, null), document.getElementById('app'));

},{"./AppFrame":1}],5:[function(require,module,exports){
'use strict';

var AddOffer = React.createClass({
  displayName: 'AddOffer',

  handleFormSubmit: function handleFormSubmit(formData) {
    var offers = this.state.data;
    var newOffers = offers.concat([formData]);
    this.setState({ data: newOffers });
    console.log(formData);
    console.log('sendFormData!!!!!');

    $.ajax({
      url: '/api/offer',
      dataType: 'json',
      type: 'POST',
      data: formData,
      success: (function (data) {
        console.log('Success!!!!');
        this.setState({ data: data });
      }).bind(this),
      error: (function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }).bind(this)
    });
  },

  getInitialState: function getInitialState() {
    return { data: [] };
  },

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        'Offers'
      ),
      React.createElement(AddOfferForm, { onFormSubmit: this.handleFormSubmit })
    );
  }
});

var AddOfferForm = React.createClass({
  displayName: 'AddOfferForm',

  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    var company_name = this.refs.company_name.value.trim();
    var position = this.refs.position.value.trim();
    this.props.onFormSubmit({
      company_name: company_name,
      position: position,
      salary: this.refs.salary.value,
      equity: this.refs.equity.value,
      vesting_start_date: this.refs.vesting_start_date.value,
      vesting_end_date: this.refs.vesting_end_date.value,
      vesting_cliff_date: this.refs.vesting_cliff_date.value,
      vesting_cliff_percent: this.refs.vesting_cliff_percent.value,
      last_financing_round_valuation: this.refs.last_financing_round_valuation.value,
      estimated_eit_valuation: this.refs.estimated_eit_valuation.value
      // benefits: this.refs.benefits.value
    });
    this.refs.company_name.value = '';
    this.refs.position.value = '';
    this.refs.salary.value = '';
    this.refs.equity.value = '';
    this.refs.vesting_start_date.value = '';
    this.refs.vesting_end_date.value = '';
    this.refs.vesting_cliff_date.value = '';
    this.refs.vesting_cliff_percent.value = '';
    this.refs.last_financing_round_valuation.value = '';
    this.refs.estimated_eit_valuation.value = '';
    // this.refs.benefits.value = '';
  },

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        { id: 'heading' },
        'Add Your Offer'
      ),
      status,
      React.createElement(
        'form',
        { onSubmit: this.handleSubmit },
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'company_name' },
            'Startup Name *'
          ),
          React.createElement('input', { className: 'form-control', name: 'company_name', ref: 'company_name', type: 'text' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'position' },
            'Position *'
          ),
          React.createElement('input', { className: 'form-control', name: 'position', ref: 'position', type: 'text' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'salary' },
            'Salary *'
          ),
          React.createElement('input', { className: 'form-control', name: 'salary', ref: 'salary', type: 'number' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'equity' },
            'Equity *'
          ),
          React.createElement('input', { className: 'form-control', name: 'equity', ref: 'equity', type: 'number' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'vesting_start_date' },
            'Vesting Start Date *'
          ),
          React.createElement('input', { className: 'form-control', name: 'vesting_start_date', ref: 'vesting_start_date', type: 'date' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'vesting_end_date' },
            'Vesting End Date *'
          ),
          React.createElement('input', { className: 'form-control', name: 'vesting_end_date', ref: 'vesting_end_date', type: 'date' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'vesting_cliff_date' },
            'Vesting Cliff Date *'
          ),
          React.createElement('input', { className: 'form-control', name: 'vesting_cliff_date', ref: 'vesting_cliff_date', type: 'date' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'vesting_cliff_percent' },
            'Vesting Cliff Percent *'
          ),
          React.createElement('input', { className: 'form-control', name: 'vesting_cliff_percent', ref: 'vesting_cliff_percent', type: 'number' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'last_financing_round_valuation' },
            'Most Recent Valuation *'
          ),
          React.createElement('input', { className: 'form-control', name: 'last_financing_round_valuation', ref: 'last_financing_round_valuation', type: 'number' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'estimated_eit_valuation' },
            'Estimated Exit Valuation *'
          ),
          React.createElement('input', { className: 'form-control', name: 'estimated_eit_valuation', ref: 'estimated_eit_valuation', type: 'number' })
        ),
        React.createElement(
          'h3',
          null,
          'What additional benefits do you receive?'
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { className: 'checkbox-inline' },
            React.createElement('input', { name: 'benefits', type: 'checkbox', value: 'food' }),
            'Food'
          ),
          React.createElement(
            'label',
            { className: 'checkbox-inline' },
            React.createElement('input', { name: 'benefits', type: 'checkbox', value: 'healthcare' }),
            'Healthcare'
          )
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'button',
            { className: 'btn btn-primary', type: 'submit', value: 'Post' },
            'Add Offer'
          )
        )
      )
    );
  }
});

module.exports = {
  AddOffer: AddOffer,
  AddOfferForm: AddOfferForm
};

},{}],6:[function(require,module,exports){
// this page will display all the info related to a given company
// see questions here: https://docs.google.com/document/d/1JeDQ7p_NZVoJrM_smjaL2eK1zUoHidwTKYucVkefUgc/edit

'use strict';

var CompanyProfile = React.createClass({
  displayName: 'CompanyProfile',

  getInitialState: function getInitialState() {
    return {
      id: '',
      name: '',
      website: '',
      growth_score: '',
      mindshare_score: '',
      custom_score: '',
      weekly_momentum: '',
      employees: '',
      employees_mom: '',
      monthly_unique: '',
      monthly_unique_mom: '',
      founding_date: '',
      stage: '',
      total_funding: '',
      last_funding_date: '',
      city: '',
      state: '',
      country: '',
      createdAt: '',
      updatedAt: ''
    };
  },

  componentDidMount: function componentDidMount() {
    $.ajax({
      url: '/api/company/1',
      dataType: 'json',
      success: (function (data) {
        console.log("SUCCESS: ");
        console.log(data);
        this.setState({
          id: data.id,
          name: data.name,
          website: data.website,
          growth_score: data.growth_score,
          mindshare_score: data.mindshare_score,
          custom_score: data.custom_score,
          weekly_momentum: data.weekly_momentum,
          employees: data.employees,
          employees_mom: data.employees_mom,
          monthly_unique: data.monthly_unique,
          monthly_unique_mom: data.monthly_unique_mom,
          founding_date: data.founding_date,
          stage: data.stage,
          total_funding: data.total_funding,
          last_funding_date: data.last_funding_date,
          city: data.city,
          state: data.state,
          country: data.country,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        });
      }).bind(this),
      error: (function (xhr, status, err) {
        console.log('ERROR');
      }).bind(this)
    });
  },

  render: function render() {
    return React.createElement(
      'div',
      null,
      this.state
    )
    // <div>{this.state.id}</div>,
    // <div>{this.state.name}</div>,
    // <div>{this.state.website}</div>,
    // <div>{this.state.growth_score}</div>,
    // <div>{this.state.mindshare_score}</div>,
    // <div>{this.state.custom_score}</div>,
    // <div>{this.state.weekly_momentum}</div>,
    // <div>{this.state.employees}</div>,
    // <div>{this.state.employees_mom}</div>,
    // <div>{this.state.monthly_unique}</div>,
    // <div>{this.state.monthly_unique_mom}</div>,
    // <div>{this.state.founding_date}</div>,
    // <div>{this.state.stage}</div>,
    // <div>{this.state.total_funding}</div>,
    // <div>{this.state.last_funding_date}</div>,
    // <div>{this.state.city}</div>,
    // <div>{this.state.state}</div>,
    // <div>{this.state.country}</div>,
    // <div>{this.state.createdAt}</div>,
    // <div>{this.state.updatedAt}</div>
    ;
  }

});

module.exports = {
  CompanyProfile: CompanyProfile
};

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
'use strict';

var tabList = [{ 'id': 1, 'name': 'Home', 'url': '/#/home' }, { 'id': 2, 'name': 'My Profile', 'url': '/#/profile' }, { 'id': 3, 'name': 'Company (to be removed from header)', 'url': '/#/company' }, { 'id': 4, 'name': 'Add Offer', 'url': '/#/addoffer' }, { 'id': 5, 'name': 'Search Startups', 'url': '/#/searchcompany' }, { 'id': 6, 'name': 'Login', 'url': '/#/login' }, { 'id': 7, 'name': 'Signup', 'url': '/#/signup' }];

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

},{"./Tab":9}]},{},[4]);
