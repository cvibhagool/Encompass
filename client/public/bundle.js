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
'use strict';

var AddOffer = React.createClass({
  displayName: 'AddOffer',

  getInitialState: function getInitialState() {
    return {
      type: 'info',
      message: ''
    };
  },

  // form submit callback
  handleSubmit: function handleSubmit(e) {
    e.preventDefault();

    this.setState({ type: 'info', message: 'Sending...' }, this.sendFormData);
  },

  sendFormData: function sendFormData() {

    // prepare form data for submitting it
    var formData = {
      company_name: ReactDOM.findDOMNode(this.refs.budget).value,
      position: ReactDOM.findDOMNode(this.refs.position).value,
      salary: ReactDOM.findDOMNode(this.refs.salary).value,
      equity: ReactDOM.findDOMNode(this.refs.equity).value,
      vesting_start_date: ReactDOM.findDOMNode(this.refs.vesting_start_date).value,
      vesting_end_date: ReactDOM.findDOMNode(this.refs.vesting_end_date).value,
      vesting_cliff_date: ReactDOM.findDOMNode(this.refs.vesting_cliff_date).value,
      vesting_cliff_percent: ReactDOM.findDOMNode(this.refs.vesting_cliff_percent).value,
      other_benefits: ReactDOM.findDOMNode(this.refs.other_benefits).value,
      last_financing_round_valuation: ReactDOM.findDOMNode(this.refs.last_financing_round_valuation).value,
      estimated_eit_valuation: ReactDOM.findDOMNode(this.refs.estimated_eit_valuation).value
    };

    // extract the checkbox values
    formData.benefits = this.getSelected('benefits');

    // send the form data
    var xmlhttp = new XMLHttpRequest();
    var _this = this;
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4) {
        var response = JSON.parse(xmlhttp.responseText);
        if (xmlhttp === 200 && response.status === 'OK') {
          _this.setState({ type: 'success', message: 'Offer submitted...' });
        } else {
          _this.setState({ type: 'danger', message: 'Offer not submitted...' });
        }
      }
    };
    xmlhttp.open('POST', 'send', true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(this.requestBuildQueryString(formData));
  },

  requestBuildQueryString: function requestBuildQueryString(params) {
    var queryString = [];
    for (var property in params) {
      if (params.hasOwnProperty(property)) {
        queryString.push(encodeURIComponent(property) + '=' + encodeURIComponent(params[property]));
      }
    }
    return queryString.join('&');
  },

  getSelected: function getSelected(fieldName) {
    var i;
    var fields = document.getElementByName(fieldName);
    var selectedFields = [];
    for (i = 0; i < fields.length; i++) {
      if (fields[i].checked === true) {
        selectedFields.push(fields[i].value);
      }
    }
    return selectedFields.join(', ');
  },

  render: function render() {
    if (this.state.type && this.state.message) {
      var classString = 'alert alert-' + this.state.type;
      var status = React.createElement(
        'div',
        { id: 'status', className: classString, ref: 'status' },
        this.state.message
      );
    }
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
        { action: '', onSubmit: this.handleSubmit },
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
          React.createElement('input', { className: 'form-control', name: 'salary', ref: 'salary', type: 'text' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'equity' },
            'Equity *'
          ),
          React.createElement('input', { className: 'form-control', name: 'equity', ref: 'equity', type: 'text' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'vesting_start_date' },
            'Vesting Start Date *'
          ),
          React.createElement('input', { className: 'form-control', name: 'vesting_start_date', ref: 'vesting_start_date', type: 'text' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'vesting_end_date' },
            'Vesting End Date *'
          ),
          React.createElement('input', { className: 'form-control', name: 'vesting_end_date', ref: 'vesting_end_date', type: 'text' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'vesting_cliff_date' },
            'Vesting Cliff Date *'
          ),
          React.createElement('input', { className: 'form-control', name: 'vesting_cliff_date', ref: 'vesting_cliff_date', type: 'text' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'vesting_cliff_percent' },
            'Vesting Cliff Percent *'
          ),
          React.createElement('input', { className: 'form-control', name: 'vesting_cliff_percent', ref: 'vesting_cliff_percent', type: 'text' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'last_financing_round_valuation' },
            'Most Recent Valuation *'
          ),
          React.createElement('input', { className: 'form-control', name: 'last_financing_round_valuation', ref: 'last_financing_round_valuation', type: 'text' })
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'label',
            { htmlFor: 'estimated_eit_valuation' },
            'Estimated Exit Valuation *'
          ),
          React.createElement('input', { className: 'form-control', name: 'estimated_eit_valuation', ref: 'estimated_eit_valuation', type: 'text' })
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
            React.createElement('input', { name: 'healthcare', type: 'checkbox', value: 'healthcare' }),
            'Healthcare'
          )
        ),
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'button',
            { className: 'btn btn-primary', type: 'submit' },
            'Add Offer'
          )
        )
      )
    );
  }
});

// POST request to server with all info listed above
// update tables: users, offers, companies

// GET request for metrics about the offer
// so we can display the offer results on the page

// var AddOffer = React.createClass({

//   handleSubmit: function(e) {
//     $.ajax({
//       url: this.props.url,
//       dataType: 'json',
//       type: 'POST',
//       data: comment,
//       success: function(data) {
//         this.setState({data: data});
//         console.log('POST')
//       }.bind(this),
//       error: function(xhr, status, err) {
//         console.error(this.props.url, status, err.toString());
//       }.bind(this)
//     });

//     e.preventDefault();
//     var company = this.refs.company.value.trim();
//     if (!company) {
//       return;
//     }

//     this.refs.company.value = '';
//     return;
//   },

//   render: function() {
//     return (

//       <form className="form-inline" onSubmit={this.handleSubmit}>
//         <div className="form-group">
//           <div>
//             <label htmlFor="company">Startup:</label>
//             <input type="text" className="form-control" id="company" placeholder="Which Startup?" ref="company" />
//           </div>

//           <label className="sr-only" htmlFor="salary">Salary (in dollars)</label>

//           <div className="input-group">
//             <div className="input-group-addon">$</div>
//             <input type="number" className="form-control" id="salary" />
//             <div className="input-group-addon">.00</div>
//           </div>

//           <label className="sr-only" htmlFor="equity">Equity Percentage</label>

//           <div className="input-group">
//             <input type="number" className="form-control" id="equity" />
//             <div className="input-group-addon">%</div>
//           </div>

//           Benefits:
//           <div className="checkbox">
//             <label>
//               <input type="checkbox" value="" /> Food
//             </label>
//             <label>
//               <input type="checkbox" /> Healthcare
//             </label>
//           </div>

//         </div>
//         <button type="submit" className="btn btn-primary" value="Post">Submit Offer</button>
//       </form>      
//     )
//   }
// });

// var Offers = React.createClass({
//   getOffers: function() {
//     $.ajax({
//       url: this.props.url,
//       dataType: 'json',
//       cache: false,
//       success: function(data) {
//         this.setState({data: data});
//       }.bind(this),
//       error: function(xhr, status, err) {
//         console.error(this.props.url, status, err.toString());
//       }.bind(this)
//     });
//   }
// });

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
