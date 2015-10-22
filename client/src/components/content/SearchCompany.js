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

  render: function() {

    var searchString = this.state.searchString.trim().toLowerCase();

    // as soon as user starts to type, filter the results
    var filteredCompanies = searchString.length > 0 ? this.props.companies.filter(function(l) {
      return l.name.toLowerCase().match(searchString);
    }) : this.props.companies
    var that = this;

    // search box + display the list of companies below the search box 
    return <div>
      <input type="text" 
        value={this.state.searchString} 
        onChange={this.handleChange} 
        placeholder="Search a Company" />

      <ul>
        {filteredCompanies.map(function(company) {
          return <CompanyItem changeCompany={that.props.changeCompany} key={company.id} company={company} />
        })}
      </ul>
    </div>
  }
});

var CompanyItem = React.createClass({
  
  handleClick: function(e) {
    e.preventDefault();
    this.props.changeCompany(this.props.company.id)
  },

  render: function() {
    return (
      <li>
        <a href='#' onClick={this.handleClick}>{this.props.company.name}</a>
      </li>
    )
  }
});

module.exports = {
  SearchCompany: SearchCompany
}
