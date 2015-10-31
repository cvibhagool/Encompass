// this file is a subview of a user's offers that they received & inputted
// its parent is UserProfile.js

// import dependencies
import React, { PropTypes, Component }  from 'react';
import _                                from 'lodash';
import { Table, TableHeader, TableRow, TableRowColumn, TableHeaderColumn,TableBody, TableFooter, FontIcon, FlatButton, ClearFix } from 'material-ui';

import OfferVis from './OfferVis';

export default class MyOffers extends Component {
  constructor () {
    super();

    // sets the state for our table settings (material-ui)
    this.state = {
      fixedHeader: true,
      stripedRows: true,
      showRowHover: true,
      showOfferExplore: false,
      selectedOffer: []
    };

    this.selectedRow = [];
  }

  componentWillMount(e) {
    e.preventDefault();
    this.props.removeApiData('/api/offer/', id)
  }

  doSelection(selection) {
    this.selectedRow = selection;
  }

  exploreOffer() {
    var offer = this.props.apiData.offers[this.selectedRow[0]];
    console.log(offer);
    this.setState({selectedOffer: offer});
    this.setState({showOfferExplore: true});
  }

  render () {
    return (<div>
              <Table 
                fixedHeader={this.state.fixedHeader}
                onRowSelection={this.doSelection.bind(this)} 
              >
                <TableHeader>
                  <TableRow>
                    <TableHeaderColumn 
                        colSpan="8" 
                        style={{textAlign: 'center'}}
                    >
                      <h1>{'My Offers'}</h1>
                    </TableHeaderColumn>
                  </TableRow>

                  <TableRow>
                    <TableHeaderColumn>{'Offer #'}</TableHeaderColumn>
                    <TableHeaderColumn>{'Startup Name'}</TableHeaderColumn>
                    <TableHeaderColumn>{'Position'}</TableHeaderColumn>
                    <TableHeaderColumn>{'Salary'}</TableHeaderColumn>
                    <TableHeaderColumn>{'Equity'}</TableHeaderColumn>
                    <TableHeaderColumn>{'Total Funding'}</TableHeaderColumn>
                    <TableHeaderColumn>{'Employees'}</TableHeaderColumn>
                    <TableHeaderColumn>{'Remove?'}</TableHeaderColumn> 
                  </TableRow>
                </TableHeader>

                <TableBody 
                  showRowHover={this.state.showRowHover}  
                  stripedRows={this.state.stripedRows}
                >
                  {_.map(this.props.apiData.offers, function (offer) {
                    return (
                      <TableRow>
                        <TableRowColumn>{offer.id ? offer.id : ' - '}</TableRowColumn>
                        <TableRowColumn>{offer.Company.name ? offer.Company.name : ' - '}</TableRowColumn>
                        <TableRowColumn>{offer.position ? offer.position : ' - '}</TableRowColumn>
                        <TableRowColumn>{offer.salary ? offer.salary : ' - '}</TableRowColumn>
                        <TableRowColumn>{offer.equity ? offer.equity : ' - '}</TableRowColumn>
                        <TableRowColumn>{offer.total_funding ? offer.total_funding : ' - '}</TableRowColumn>
                        <TableRowColumn>{offer.employees ? offer.employees : ' - '}</TableRowColumn>

                      { /* this is not working; trying to remove list item upon clicking X */ }
                        <TableRowColumn onClick={this.clickRemoveOffer.bind(this)}><a href='#'>{'X'}</a></TableRowColumn>
                      </TableRow>
                    )
                  }.bind(this))
                  }
                </TableBody>
              </Table>
              <div>
              <FlatButton 
                  label="Explore" 
                  onClick={this.exploreOffer.bind(this)}
                  primary={true}  
              />
              </div>
              <div>
                {this.state.showOfferExplore ? <OfferVis data={this.state.selectedOffer} /> : ''}
              </div>
            </div>)
  }
}

MyOffers.propTypes = {
  apiData: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  removeApiData: PropTypes.func.isRequired
}
