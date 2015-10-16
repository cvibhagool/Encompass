var tabList = [
    { 'id': 1, 'name': 'Mike', 'url': '/mike' },
    { 'id': 2, 'name': 'Donnie', 'url': '/donnie' },
    { 'id': 3, 'name': 'Raph', 'url': '/raph' },
    { 'id': 4, 'name': 'Leo', 'url': '/leo' }
];

var NavBar = React.createClass({
	render: function() {
		return (
			<div>
				<Tabs tablist={tabList} />
			</div>
		);
	}
});

var Tab = React.createClass({
	render: function() {
		return (<li><a href={this.props.url}>{this.props.name}</a></li>);
	}
});

var Tabs = React.createClass({
	render: function(){
		    return (
	            <ul>
	                {this.props.tablist.map(function(tab) {
	                    return (
	                        <Tab url={tab.url} name={tab.name} />
	                    );
	                })}
	            </ul>
	        );
	    
    }
});

ReactDOM.render(<NavBar/>, document.getElementById('example'));

