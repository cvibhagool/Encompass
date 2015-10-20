var AddOffer = React.createClass({
    
  sendFormData: function(formData) {
    console.log('sendFormData!!!!!')
    $.ajax({
      url: '/api/offer',
      dataType: 'json',
      type: 'POST',
      data: formData,
      success: function(data) {
        console.log('Success!!!!')
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div>
        <h1 id="heading">Add Your Offer</h1>
        {status}
        <form action="" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="company_name">Startup Name *</label>
            <input className="form-control" name="company_name" ref="company_name" type="text" />
          </div>

          <div className="form-group">
            <label htmlFor="position">Position *</label>
            <input className="form-control" name="position" ref="position" type="text" />
          </div>

          <div className="form-group">
            <label htmlFor="salary">Salary *</label>
            <input className="form-control" name="salary" ref="salary" type="number" />
          </div>

          <div className="form-group">
            <label htmlFor="equity">Equity *</label>
            <input className="form-control" name="equity" ref="equity" type="number" />
          </div>

          <div className="form-group">
            <label htmlFor="vesting_start_date">Vesting Start Date *</label>
            <input className="form-control" name="vesting_start_date" ref="vesting_start_date" type="date" />
          </div>

          <div className="form-group">
            <label htmlFor="vesting_end_date">Vesting End Date *</label>
            <input className="form-control" name="vesting_end_date" ref="vesting_end_date" type="date" />
          </div>

          <div className="form-group">
            <label htmlFor="vesting_cliff_date">Vesting Cliff Date *</label>
            <input className="form-control" name="vesting_cliff_date" ref="vesting_cliff_date" type="date" />
          </div>

          <div className="form-group">
            <label htmlFor="vesting_cliff_percent">Vesting Cliff Percent *</label>
            <input className="form-control" name="vesting_cliff_percent" ref="vesting_cliff_percent" type="number" />
          </div>

          <div className="form-group">
            <label htmlFor="last_financing_round_valuation">Most Recent Valuation *</label>
            <input className="form-control" name="last_financing_round_valuation" ref="last_financing_round_valuation" type="number" />
          </div>

          <div className="form-group">
            <label htmlFor="estimated_eit_valuation">Estimated Exit Valuation *</label>
            <input className="form-control" name="estimated_eit_valuation" ref="estimated_eit_valuation" type="number" />
          </div>

          <h3>What additional benefits do you receive?</h3>
          <div className="form-group">
            <label className="checkbox-inline"><input name="benefits" type="checkbox" value="food" />Food</label>
            <label className="checkbox-inline"><input name="healthcare" type="checkbox" value="healthcare" />Healthcare</label>
          </div>

          <div className="form-group">
            <button className="btn btn-primary" type="submit">Add Offer</button>
          </div>
        </form>
      </div>
    )
  }
});

module.exports = {
  AddOffer: AddOffer
}

