var UserProfile = require('./content/UserProfile').UserProfile;
var AddOffer = require('./content/AddOffer').AddOffer;
var SearchCompany = require('./content/SearchCompany').SearchCompany;
var Landing = require('./content/Landing.js');
var CompanyProfile = require('./content/CompanyProfile').CompanyProfile;

var ContentView = React.createClass({
  render: function() {
    return (
      <div id='content-view'>
        <div className="content"> {this.props.currentTab === 1 ? <Landing /> : null }</div>
        <div className="content"> {this.props.currentTab === 2 ? <UserProfile /> : null }</div>
        <div className="content"> {this.props.currentTab === 3 ? <CompanyProfile /> : null }</div>
        <div className="content"> {this.props.currentTab === 4 ? <AddOffer /> : null }</div>
        <div className="content"> {this.props.currentTab === 5 ? <SearchCompany /> : null }</div>
        <div className="content"> {this.props.currentTab === 6 ? <Login /> : null }</div>
        <div className="content"> {this.props.currentTab === 7 ? <Signup /> : null }</div>
      </div>
    );
  }
});

module.exports = {
  ContentView: ContentView
}
