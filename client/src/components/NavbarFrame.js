var NavBar = React.createClass({
  changeTab: function(tab) {
    console.log('Navbar.changeTab');
    this.props.changeContent(tab);
  },

  render: function() {
    return (
      <div id='nav-bar'>
        <Tabs tablist={this.props.tablist} changeTab={this.changeTab} />
      </div>
    );
  }
});

var Tabs = React.createClass({
  handleClick: function(tab) {
    console.log('Tabs.handleClick');
    this.props.changeTab(tab)
  },
  
  render: function() {
    return (
      <ul>
        { this.props.tablist.map(function(tab) {
          return (
            <Tab 
              key={tab.id} 
              url={tab.url} 
              handleClick={this.handleClick.bind(this, tab)} 
              name={tab.name} />
          );
        }.bind(this))
      }
      </ul>
    );
  }
});

var Tab = React.createClass({
  handleClick: function(e){
    e.preventDefault();
    this.props.handleClick();
  },

  render: function() {
    return (<li  className='tab'><a href={this.props.url} onClick={this.handleClick}>{this.props.name}</a></li>);
  }
});

module.exports = {
  NavBar: NavBar,
  Tabs: Tabs,
  Tab: Tab
}