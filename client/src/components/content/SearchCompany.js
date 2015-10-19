
var libraries = [

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


var SearchCompany = React.createClass({

  getInitialState: function() {
    return { searchString: ''};
  },

  handleChange: function(e) {
    this.setState({searchString: e.target.value});
  },

  render: function() {
    // var libraries = this.props.items;
    console.log('test')
    console.log(libraries)
    var searchString = this.state.searchString.trim().toLowerCase();
    
    console.log('test')
    console.log(searchString)
    
    if (searchString.length > 0) {
      libraries = libraries.filter(function(l) {
        return l.name.toLowerCase().match(searchString);
      });
    }

    return <div>
      <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Search a Company" />
      <ul>
        {libraries.map(function(l) {
          return <li key={libraries.id}>{l.name}</li>;
        })}
      </ul>
    </div>
  }
});


module.exports = {
  SearchCompany: SearchCompany
}
