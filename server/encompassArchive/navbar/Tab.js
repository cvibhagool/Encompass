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
  Tab: Tab
}
