'use strict';

var tabList = [{ 'id': 1, 'name': 'Mike', 'url': '/mike' }, { 'id': 2, 'name': 'Donnie', 'url': '/donnie' }, { 'id': 3, 'name': 'Raph', 'url': '/raph' }, { 'id': 4, 'name': 'Leo', 'url': '/leo' }];

var NavBar = React.createClass({
	displayName: 'NavBar',

	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(Tabs, { tablist: tabList })
		);
	}
});

var Tab = React.createClass({
	displayName: 'Tab',

	render: function render() {
		return React.createElement(
			'li',
			null,
			React.createElement(
				'a',
				{ href: this.props.url },
				this.props.name
			)
		);
	}
});

var Tabs = React.createClass({
	displayName: 'Tabs',

	render: function render() {
		return React.createElement(
			'ul',
			null,
			this.props.tablist.map(function (tab) {
				return React.createElement(Tab, { url: tab.url, name: tab.name });
			})
		);
	}
});

ReactDOM.render(React.createElement(NavBar, null), document.getElementById('example'));