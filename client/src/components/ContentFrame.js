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

module.exports = {
  ContentView: ContentView
}