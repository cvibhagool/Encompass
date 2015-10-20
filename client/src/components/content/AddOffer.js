var AddOffer = React.createClass({

  getInitialState: function() {
    return {
      type: 'info',
      message: ''
    }
  },

  // form submit callback
  handleSubmit: function(e) {
    e.preventDefault();

    this.setState({ type: 'info', message: 'Sending...' }, this.sendFormData);
  },

  sendFormData: function() {

    // prepare form data for submitting it
    var formData = {
      company_name: ReactDOM.findDOMNode(this.refs.budget).value,
      position: ReactDOM.findDOMNode(this.refs.position).value,
      salary: ReactDOM.findDOMNode(this.refs.salary).value,
      equity: ReactDOM.findDOMNode(this.refs.equity).value,
      vesting_start_date: ReactDOM.findDOMNode(this.refs.vesting_start_date).value,
      vesting_end_date: ReactDOM.findDOMNode(this.refs.vesting_end_date).value,
      vesting_cliff_date: ReactDOM.findDOMNode(this.refs.vesting_cliff_date).value,
      vesting_cliff_percent: ReactDOM.findDOMNode(this.refs.vesting_cliff_percent).value,
      other_benefits: ReactDOM.findDOMNode(this.refs.other_benefits).value,
      last_financing_round_valuation: ReactDOM.findDOMNode(this.refs.last_financing_round_valuation).value,
      estimated_eit_valuation: ReactDOM.findDOMNode(this.refs.estimated_eit_valuation).value
    };

    // extract the checkbox values
    formData.benefits = this.getSelected('benefits');

    // send the form data
    var xmlhttp = new XMLHttpRequest();
    var _this = this;
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        var response = JSON.parse(xmlhttp.responseText);
        if (xmlhttp === 200 && response.status === 'OK') {
          _this.setState({ type: 'success', message: 'Offer submitted...'});
        }
        else {
          _this.setState({ type: 'danger', message: 'Offer not submitted...'});
        }
      }
    };
    xmlhttp.open('POST', 'send', true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(this.requestBuildQueryString(formData));
  },

  requestBuildQueryString: function(params) {
    var queryString = [];
    for (var property in params) {
      if (params.hasOwnProperty(property)) {
        queryString.push(encodeURIComponent(property) + '=' + encodeURIComponent(params[property]));
      }
    }
    return queryString.join('&');
  },

  getSelected: function(fieldName) {
    var i;
    var fields = document.getElementByName(fieldName);
    var selectedFields = [];
    for (i = 0; i < fields.length; i++) {
      if (fields[i].checked === true) {
        selectedFields.push(fields[i].value);
      }
    }
    return selectedFields.join(', ');
  },

  render: function() {
    if (this.state.type && this.state.message) {
      var classString = 'alert alert-' + this.state.type;
      var status = <div id="status" className={classString} ref="status">{this.state.message}</div>
    }
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
            <input className="form-control" name="salary" ref="salary" type="text" />
          </div>

          <div className="form-group">
            <label htmlFor="equity">Equity *</label>
            <input className="form-control" name="equity" ref="equity" type="text" />
          </div>

          <div className="form-group">
            <label htmlFor="vesting_start_date">Vesting Start Date *</label>
            <input className="form-control" name="vesting_start_date" ref="vesting_start_date" type="text" />
          </div>

          <div className="form-group">
            <label htmlFor="vesting_end_date">Vesting End Date *</label>
            <input className="form-control" name="vesting_end_date" ref="vesting_end_date" type="text" />
          </div>

          <div className="form-group">
            <label htmlFor="vesting_cliff_date">Vesting Cliff Date *</label>
            <input className="form-control" name="vesting_cliff_date" ref="vesting_cliff_date" type="text" />
          </div>

          <div className="form-group">
            <label htmlFor="vesting_cliff_percent">Vesting Cliff Percent *</label>
            <input className="form-control" name="vesting_cliff_percent" ref="vesting_cliff_percent" type="text" />
          </div>

          <div className="form-group">
            <label htmlFor="last_financing_round_valuation">Most Recent Valuation *</label>
            <input className="form-control" name="last_financing_round_valuation" ref="last_financing_round_valuation" type="text" />
          </div>

          <div className="form-group">
            <label htmlFor="estimated_eit_valuation">Estimated Exit Valuation *</label>
            <input className="form-control" name="estimated_eit_valuation" ref="estimated_eit_valuation" type="text" />
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









// POST request to server with all info listed above
// update tables: users, offers, companies

// GET request for metrics about the offer
// so we can display the offer results on the page

// var AddOffer = React.createClass({

//   handleSubmit: function(e) {
//     $.ajax({
//       url: this.props.url,
//       dataType: 'json',
//       type: 'POST',
//       data: comment, 
//       success: function(data) {
//         this.setState({data: data});
//         console.log('POST')
//       }.bind(this),
//       error: function(xhr, status, err) {
//         console.error(this.props.url, status, err.toString());
//       }.bind(this)
//     });

//     e.preventDefault();
//     var company = this.refs.company.value.trim();
//     if (!company) {
//       return;
//     }

//     this.refs.company.value = '';
//     return;
//   },

//   render: function() {
//     return (

//       <form className="form-inline" onSubmit={this.handleSubmit}>
//         <div className="form-group">
//           <div>
//             <label htmlFor="company">Startup:</label>
//             <input type="text" className="form-control" id="company" placeholder="Which Startup?" ref="company" />
//           </div>

//           <label className="sr-only" htmlFor="salary">Salary (in dollars)</label>

//           <div className="input-group">
//             <div className="input-group-addon">$</div>
//             <input type="number" className="form-control" id="salary" />
//             <div className="input-group-addon">.00</div>
//           </div>

//           <label className="sr-only" htmlFor="equity">Equity Percentage</label>
        
//           <div className="input-group">
//             <input type="number" className="form-control" id="equity" />
//             <div className="input-group-addon">%</div>
//           </div>

//           Benefits: 
//           <div className="checkbox">
//             <label>
//               <input type="checkbox" value="" /> Food
//             </label>
//             <label>
//               <input type="checkbox" /> Healthcare
//             </label>
//           </div>

//         </div>
//         <button type="submit" className="btn btn-primary" value="Post">Submit Offer</button>
//       </form>       
//     )
//   }
// });

// var Offers = React.createClass({
//   getOffers: function() {
//     $.ajax({
//       url: this.props.url,
//       dataType: 'json',
//       cache: false,
//       success: function(data) {
//         this.setState({data: data});
//       }.bind(this),
//       error: function(xhr, status, err) {
//         console.error(this.props.url, status, err.toString());
//       }.bind(this)
//     });
//   }
// });

// var PostOffer = React.createClass()

    // note: in our formula to calculate the value of the offer, we should also include federal and state taxes


module.exports = {
  AddOffer: AddOffer
}
