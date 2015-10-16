var tabList = [
  { 'id': 1, 'name': 'Home', 'url': '/#/home' },
  { 'id': 2, 'name': 'Company View', 'url': '/#/company' },
  { 'id': 3, 'name': 'Search', 'url': '/#/search' },
  { 'id': 4, 'name': 'Compensation Packages', 'url': '/#/compensation' }
];

var AppView = React.createClass({

  getInitialState: function() {
    return {
      tablist: tabList,
      currentTab: 1
    };
  },

  changeContent: function(tab) {
    console.log('AppView.changeContent');
    this.setState({ currentTab: tab.id });
  },

  render: function() {
    return (
      <div id='app-view'>
        <NavBar tablist={this.state.tablist} changeContent={this.changeContent} />
        <ContentView currentTab={this.state.currentTab} />
      </div>
    );
  }
});

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

var ContentView = React.createClass({
  render: function() {
    return (
      <div id='content-view'>
        <div className="content"> {this.props.currentTab === 1 ? <div className="home"> Home Here </div> : null }</div>
        <div className="content"> {this.props.currentTab === 2 ? <div className="company"> Company Here </div> : null }</div>
        <div className="content"> {this.props.currentTab === 3 ? <div className="search"> Search Here </div> : null }</div>
        <div className="content"> {this.props.currentTab === 4 ? <div className="compensation"> Compensation Here </div> : null }</div>
      </div>
    );
  }
});


ReactDOM.render(<AppView/>, document.getElementById('app'));

