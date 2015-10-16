var tabList = [
    { 'id': 1, 'name': 'Home', 'url': '/home' },
    { 'id': 2, 'name': 'Company View', 'url': '/company' },
    { 'id': 3, 'name': 'Search', 'url': '/search' },
    { 'id': 4, 'name': 'Compensation Packages', 'url': '/compensation' }
];

var AppView = React.createClass({
	render: function() {
		return (
			<div id='app-view'>
				<NavBar tablist={tabList} />
				<ContentView/>
			</div>
		);
	}
})

var NavBar = React.createClass({
	render: function() {
		return (
			<div id='nav-bar'>
				<Tabs tablist={this.props.tablist} />
			</div>
		);
	}
});


var Tabs = React.createClass({
	render: function(){
	    return (
            <ul>
                {this.props.tablist.map(function(tab) {
                    return (
                        <Tab key={tab.id} url={tab.url} name={tab.name} />
                    );
                })}
            </ul>
        );    
    }
});


var Tab = React.createClass({
	render: function() {
		return (<li  className='tab'><a href={this.props.url}>{this.props.name}</a></li>);
	}
});

var ContentView = React.createClass({
	render: function() {
		return (
			<div id='content-view'>
			</div>
		);
	}
});


ReactDOM.render(<AppView/>, document.getElementById('app'));

