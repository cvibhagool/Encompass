import React, { PropTypes, Component } from 'react';

export default class AddOffer extends Component {
 
  getInitialState () {
    return {data: []};
  }

  handleSubmit (e) {
    e.preventDefault();
    let formData = {
      company_name: this.refs.company_name.value.trim(),
      position: this.refs.position.value.trim(),
      salary: this.refs.salary.value,
      equity: this.refs.equity.value,
      vesting_start_date: this.refs.vesting_start_date.value,
      vesting_end_date: this.refs.vesting_end_date.value,
      vesting_cliff_date: this.refs.vesting_cliff_date.value,
      vesting_cliff_percent: this.refs.vesting_cliff_percent.value,
      last_financing_round_valuation: this.refs.last_financing_round_valuation.value,
      estimated_exit_valuation: this.refs.estimated_exit_valuation.value
      // benefits: this.refs.benefits.value
    }
    this.props.postApiData('/api/offer', formData);

    this.refs.company_name.value = '';
    this.refs.position.value = '';
    this.refs.salary.value = '';
    this.refs.equity.value = '';
    this.refs.vesting_start_date.value = '';
    this.refs.vesting_end_date.value = '';
    this.refs.vesting_cliff_date.value = '';
    this.refs.vesting_cliff_percent.value = '';
    this.refs.last_financing_round_valuation.value = '';
    this.refs.estimated_exit_valuation.value = ''; 
    // this.refs.benefits.value = '';
  }

  render () {
    return (
      <div>
        <h1 id="heading">Add Your Offer</h1>
        {status}
        <form onSubmit={this.handleSubmit.bind(this)}>
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
            <label htmlFor="estimated_exit_valuation">Estimated Exit Valuation *</label>
            <input className="form-control" name="estimated_exit_valuation" ref="estimated_exit_valuation" type="number" />
          </div>

          <h3>What additional benefits do you receive?</h3>
          <div className="form-group">
            <label className="checkbox-inline"><input name="benefits" type="checkbox" value="food" />Food</label>
            <label className="checkbox-inline"><input name="benefits" type="checkbox" value="healthcare" />Healthcare</label>
          </div>

          <div className="form-group">
            <button className="btn btn-primary" type="submit" value="Post">Add Offer</button>
          </div>
        </form>
      </div>
    )
  }
};




























// import React, { PropTypes, Component } from 'react';
// import ReactDOM from 'react-dom';

// export default class AddOffer extends Component {
  
//   // form submit callback
//   handleSubmit(e) {
//     e.preventDefault();
//     var newProps = Object.assign({}, this.props, {
//         type : 'info',
//         message : 'Sending...'
//       });
//     this.props = newProps;
//     this.sendFormData();
//   }

  
//   //Sending form is still broken!!!
//   sendFormData() {
//     // prepare form data for submitting it
//     var formData = {
//       company_name: ReactDOM.findDOMNode(this.refs.budget).value,
//       position: ReactDOM.findDOMNode(this.refs.position).value,
//       salary: ReactDOM.findDOMNode(this.refs.salary).value,
//       equity: ReactDOM.findDOMNode(this.refs.equity).value,
//       vesting_start_date: ReactDOM.findDOMNode(this.refs.vesting_start_date).value,
//       vesting_end_date: ReactDOM.findDOMNode(this.refs.vesting_end_date).value,
//       vesting_cliff_date: ReactDOM.findDOMNode(this.refs.vesting_cliff_date).value,
//       vesting_cliff_percent: ReactDOM.findDOMNode(this.refs.vesting_cliff_percent).value,
//       other_benefits: ReactDOM.findDOMNode(this.refs.other_benefits).value,
//       last_financing_round_valuation: ReactDOM.findDOMNode(this.refs.last_financing_round_valuation).value,
//       estimated_exit_valuation: ReactDOM.findDOMNode(this.refs.estimated_exit_valuation).value
//     };

//     // extract the checkbox values
//     formData.benefits = this.getSelected('benefits');
//     debugger;
//     // send the form data
//     var xmlhttp = new XMLHttpRequest();
//     var _this = this;
//     xmlhttp.onreadystatechange = function() {
//       if (xmlhttp.readyState === 4) {
//         var response = JSON.parse(xmlhttp.responseText);
//         var changedProps = {};
//         if (xmlhttp === 200 && response.status === 'OK') {
//           changedProps.type = 'success';
//           changedProps.message = 'Offer submitted...';
//         }
//         else {
//           changedProps.type = 'danger'; 
//           changedProps.message = 'Offer not submitted...';
//         }
//         var newProps = Object.assign({}, this.props, changedProps);
//         this.props = newProps;
//       }
//     }.bind(this);
//     xmlhttp.open('POST', 'send', true);
//     xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//     xmlhttp.send(this.requestBuildQueryString(formData));
//   }

//   requestBuildQueryString(params) {
//     var queryString = [];
//     for (var property in params) {
//       if (params.hasOwnProperty(property)) {
//         queryString.push(encodeURIComponent(property) + '=' + encodeURIComponent(params[property]));
//       }
//     }
//     return queryString.join('&');
//   }

//   getSelected(fieldName) {
//     var i;
//     var fields = document.getElementByName(fieldName);
//     var selectedFields = [];
//     for (i = 0; i < fields.length; i++) {
//       if (fields[i].checked === true) {
//         selectedFields.push(fields[i].value);
//       }
//     }
//     return selectedFields.join(', ');
//   }

//   render() {
//     if (this.props.type && this.props.message) {
//       var classString = 'alert alert-' + this.state.type;
//       var status = <div id="status" className={classString} ref="status">{this.state.message}</div>
//     }
//     return (
//       <div>
//         <h1 id="heading">Add Your Offer</h1>
//         {status}
//         <form action="" onSubmit={this.handleSubmit.bind(this)}>
//           <div className="form-group">
//             <label htmlFor="company_name">Startup Name *</label>
//             <input className="form-control" name="company_name" ref="company_name" type="text" />
//           </div>

//           <div className="form-group">
//             <label htmlFor="position">Position *</label>
//             <input className="form-control" name="position" ref="position" type="text" />
//           </div>

//           <div className="form-group">
//             <label htmlFor="salary">Salary *</label>
//             <input className="form-control" name="salary" ref="salary" type="text" />
//           </div>

//           <div className="form-group">
//             <label htmlFor="equity">Equity *</label>
//             <input className="form-control" name="equity" ref="equity" type="text" />
//           </div>

//           <div className="form-group">
//             <label htmlFor="vesting_start_date">Vesting Start Date *</label>
//             <input className="form-control" name="vesting_start_date" ref="vesting_start_date" type="text" />
//           </div>

//           <div className="form-group">
//             <label htmlFor="vesting_end_date">Vesting End Date *</label>
//             <input className="form-control" name="vesting_end_date" ref="vesting_end_date" type="text" />
//           </div>

//           <div className="form-group">
//             <label htmlFor="vesting_cliff_date">Vesting Cliff Date *</label>
//             <input className="form-control" name="vesting_cliff_date" ref="vesting_cliff_date" type="text" />
//           </div>

//           <div className="form-group">
//             <label htmlFor="vesting_cliff_percent">Vesting Cliff Percent *</label>
//             <input className="form-control" name="vesting_cliff_percent" ref="vesting_cliff_percent" type="text" />
//           </div>

//           <div className="form-group">
//             <label htmlFor="last_financing_round_valuation">Most Recent Valuation *</label>
//             <input className="form-control" name="last_financing_round_valuation" ref="last_financing_round_valuation" type="text" />
//           </div>

//           <div className="form-group">
//             <label htmlFor="estimated_exit_valuation">Estimated Exit Valuation *</label>
//             <input className="form-control" name="estimated_exit_valuation" ref="estimated_exit_valuation" type="text" />
//           </div>

//           <h3>What additional benefits do you receive?</h3>
//           <div className="form-group">
//             <label className="checkbox-inline"><input name="benefits" type="checkbox" value="food" />Food</label>
//             <label className="checkbox-inline"><input name="healthcare" type="checkbox" value="healthcare" />Healthcare</label>
//           </div>

//           <div className="form-group">
//             <button className="btn btn-primary" type="submit">Add Offer</button>
//           </div>
//         </form>
//       </div>
//     )
//   }
// }
