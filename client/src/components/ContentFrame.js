var UserProfile = require('./content/UserProfile').UserProfile;
var AddOffer = require('./content/AddOffer').AddOffer;
var SearchCompany = require('./content/SearchCompany').SearchCompany;

var ContentView = React.createClass({
  render: function() {
    return (
      <div id='content-view'>
        <div className="content"> {this.props.currentTab === 1 ? <div className="home"> Home Here </div> : null }</div>
        <div className="content"> {this.props.currentTab === 2 ? <UserProfile /> : null }</div>
        <div className="content"> {this.props.currentTab === 3 ? <AddOffer /> : null }</div>
        <div className="content"> {this.props.currentTab === 4 ? <SearchCompany /> : null }</div>
        <div className="content"> {this.props.currentTab === 5 ? <Login /> : null }</div>
        <div className="content"> {this.props.currentTab === 6 ? <Signup /> : null }</div>
      </div>
    );
  }
});

module.exports = {
  ContentView: ContentView
}
