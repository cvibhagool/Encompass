// react does not regenerate the list items when the user deletes/retypes their search

var SearchCompany = React.createClass({

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
    return <div>
      <input type="text" 
        value={this.state.searchString} 
        onChange={this.handleChange} 
        placeholder="Search a Company" />

      <ul>
        // !! React yells that each child (li item) should have a unique key prop
        // but I already did include one here so I'm not sure whats wrong
        {companies.map(function(lib) {
          return <li key={lib.id}>{lib.name}</li>
        })}
      </ul>
    </div>
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
