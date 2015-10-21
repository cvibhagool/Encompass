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
      companies = this.props.companies.filter(function(l) {
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

module.exports = {
  SearchCompany: SearchCompany
}
