// this page will display all the info related to a given company
// see questions here: https://docs.google.com/document/d/1JeDQ7p_NZVoJrM_smjaL2eK1zUoHidwTKYucVkefUgc/edit

var CompanyProfile = React.createClass({

  getInitialState: function() {
    return {
      id: '',
      name: '',
      website: '',
      growth_score: '',
      mindshare_score: '',
      custom_score: '',
      weekly_momentum: '',
      employees: '',
      employees_mom: '',
      monthly_unique: '',
      monthly_unique_mom: '',
      founding_date: '',
      stage: '',
      total_funding: '',
      last_funding_date: '',
      city: '',
      state: '',
      country: '',
      createdAt: '',
      updatedAt: ''
    };
  },

  componentDidMount: function() {
    $.ajax({
      url: '/api/company/1',
      dataType: 'json',
      success: function(data) {
        console.log("SUCCESS: ")
        console.log(data)
        this.setState({
          id: data.id,
          name: data.name,
          website: data.website,
          growth_score: data.growth_score,
          mindshare_score: data.mindshare_score,
          custom_score: data.custom_score,
          weekly_momentum: data.weekly_momentum,
          employees: data.employees,
          employees_mom: data.employees_mom,
          monthly_unique: data.monthly_unique,
          monthly_unique_mom: data.monthly_unique_mom,
          founding_date: data.founding_date,
          stage: data.stage,
          total_funding: data.total_funding,
          last_funding_date: data.last_funding_date,
          city: data.city,
          state: data.state,
          country: data.country,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log('ERROR')
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div>{this.state}</div>
      // <div>{this.state.id}</div>,
      // <div>{this.state.name}</div>,
      // <div>{this.state.website}</div>,
      // <div>{this.state.growth_score}</div>,
      // <div>{this.state.mindshare_score}</div>,
      // <div>{this.state.custom_score}</div>,
      // <div>{this.state.weekly_momentum}</div>,
      // <div>{this.state.employees}</div>,
      // <div>{this.state.employees_mom}</div>,
      // <div>{this.state.monthly_unique}</div>,
      // <div>{this.state.monthly_unique_mom}</div>,
      // <div>{this.state.founding_date}</div>,
      // <div>{this.state.stage}</div>,
      // <div>{this.state.total_funding}</div>,
      // <div>{this.state.last_funding_date}</div>,
      // <div>{this.state.city}</div>,
      // <div>{this.state.state}</div>,
      // <div>{this.state.country}</div>,
      // <div>{this.state.createdAt}</div>,
      // <div>{this.state.updatedAt}</div>
    )
  }

});

module.exports = {
  CompanyProfile: CompanyProfile
}

