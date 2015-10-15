// var React = require('react');
// var ReactDOM = require('react-dom');
// var HelloWorld = React.createClass({
//   render: function(){
//     return (
//       <div>
//         Hello World!
//       </div>
//     )
//   }
// });

// ReactDOM.render(
//   <h1>Hello, world!</h1>,
//   document.getElementById('app');
// );
// React.render(<HelloWorld />, document.getElementById('app'));

'use strict';

React.render(React.createElement(
  'h1',
  null,
  'Hello, world!'
), document.getElementById('example'));