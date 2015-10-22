var UserProfile = require('./content/UserProfile').UserProfile;
var AddOffer = require('./content/AddOffer').AddOffer;
var SearchCompany = require('./content/SearchCompany').SearchCompany;
var Landing = require('./content/Landing.js');
var CompanyProfile = require('./content/CompanyProfile').CompanyProfile;
var companies = require('../constants/companies');

var ContentFrame = React.createClass({
  render: function() {
    return (
      <div id='content-view'>
        <div className="content"> {this.props.currentTab === 1 ? <Landing /> : null }</div>
        <div className="content"> {this.props.currentTab === 2 ? <UserProfile /> : null }</div>
        <div className="content"> {this.props.currentTab === 3 ? <CompanyProfile companyId={this.props.currentCompany} /> : null }</div>
        <div className="content"> {this.props.currentTab === 4 ? <AddOffer /> : null }</div>
        <div className="content"> {this.props.currentTab === 5 ? <SearchCompany changeCompany={this.props.changeCompany} companies={companies} /> : null }</div>
        <div className="content"> {this.props.currentTab === 6 ? <Login /> : null }</div>
        <div className="content"> {this.props.currentTab === 7 ? <Signup /> : null }</div>
      </div>
    );
  }
});

module.exports = {
  ContentFrame: ContentFrame
}
