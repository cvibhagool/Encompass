var Tabs = require('./navbar/Tabs').Tabs;

var NavBar = React.createClass({
  changeTab: function(tab) {
    console.log('Navbar.changeTab');
    this.props.changeContent(tab);
  },

  render: function() {
    return (
      <div id='nav-bar'>
        <Tabs changeTab={this.changeTab} />
      </div>
    );
  }
});

module.exports = {
  NavBar: NavBar
}
