var CompanyProfile = React.createClass({

  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    console.log('/api/company/' + this.props.companyId)
    $.ajax({
      url: '/api/company/' + this.props.companyId,
      dataType: 'json',
      success: function(data) {
        console.log("SUCCESS: ")
        console.log(data)
        this.setState({data: [
          data.id,
          data.name,
          data.website,
          data.growth_score,
          data.mindshare_score,
          data.custom_score,
          data.weekly_momentum,
          data.employees,
          data.employees_mom,
          data.monthly_unique,
          data.monthly_unique_mom,
          data.founding_date,
          data.stage,
          data.total_funding,
          data.last_funding_date,
          data.city,
          data.state,
          data.country,
          data.createdAt,
          data.updatedAt
        ]})
      }.bind(this),
      error: function(xhr, status, err) {
        console.log('ERROR')
      }.bind(this)
    });
  },

  render: function() {
    console.log('this.state.data', this.state.data)
    return (
      <ul>
        { this.state.data.map(function(item, i) {
          return (<li key={i}>{item}</li>);
        }.bind(this)) }
      </ul>
    )
  }

});

module.exports = {
  CompanyProfile: CompanyProfile
}

