// this file is a subview of a user's offers that they received & inputted
// its parent is UserProfile.js

// import dependencies
import React, { PropTypes, Component }  from 'react';
import _                                from 'lodash';
import { Table, TableHeader, TableRow, TableRowColumn, TableHeaderColumn,TableBody,TableFooter } from 'material-ui';

export default class MyOffers extends Component {
  constructor () {
    super();

    // sets the state for our table settings (material-ui)
    this.state = {
      fixedHeader: true,
      stripedRows: true,
      showRowHover: false,
    };
  }

  render () {
    return (<div>
              <Table fixedHeader={this.state.fixedHeader}>
                <TableHeader>
                  <TableRow>
                    <TableHeaderColumn 
                        colSpan="7" 
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
                  </TableRow>
                </TableHeader>

                <TableBody stripedRows={this.state.stripedRows}>
                  {_.map(this.props.apiData.offers, function (offer) {
                    return (
                      <TableRow>
                        <TableRowColumn>{offer.id}</TableRowColumn>
                        <TableRowColumn>{offer.Company.name}</TableRowColumn>
                        <TableRowColumn>{offer.position}</TableRowColumn>
                        <TableRowColumn>{offer.salary}</TableRowColumn>
                        <TableRowColumn>{offer.equity}</TableRowColumn>
                        <TableRowColumn>{offer.total_funding}</TableRowColumn>
                        <TableRowColumn>{offer.employees}</TableRowColumn>
                      </TableRow>
                    )
                  }.bind(this))
                  }
                </TableBody>
              </Table>
            </div>)
  }
}

MyOffers.propTypes = {
  apiData: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
}
