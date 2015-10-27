// this file is a subview of a user's companies that they follow
// its parent is UserProfile.js

// import dependencies
import React, { PropTypes, Component } from 'react';
import _                               from 'lodash';
import { Table, TableHeader, TableRow, TableRowColumn, TableHeaderColumn,TableBody,TableFooter } from 'material-ui';

export default class MyCompanies extends Component {

  constructor () {
    super();

    this.displayName = "MyCompanies";
    
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
                      <h1>{'My Companies'}</h1>
                    </TableHeaderColumn>
                  </TableRow>

                  <TableRow>
                    <TableHeaderColumn>{'Name'}</TableHeaderColumn>
                    <TableHeaderColumn>{'Website'}</TableHeaderColumn>
                    <TableHeaderColumn>{'City'}</TableHeaderColumn>
                    <TableHeaderColumn>{'Employees'}</TableHeaderColumn>
                    <TableHeaderColumn>{'Founding'}</TableHeaderColumn>
                    <TableHeaderColumn>{'Stage'}</TableHeaderColumn>
                    <TableHeaderColumn>{'Funding'}</TableHeaderColumn>
                  </TableRow>
                </TableHeader>

                <TableBody stripedRows={this.state.stripedRows}>
                  {_.map(this.props.apiData.companies, function(company) {
                    return (
                      <TableRow>
                        <TableRowColumn>{company.name}</TableRowColumn>
                        <TableRowColumn>
                          <a 
                              href={company.website} 
                              target="_blank"
                          >
                            {company.website}
                          </a>
                        </TableRowColumn>
                        <TableRowColumn>{company.city}</TableRowColumn>
                        <TableRowColumn>{company.employees}</TableRowColumn>
                        <TableRowColumn>{company.founding_date}</TableRowColumn>
                        <TableRowColumn>{company.stage}</TableRowColumn>
                        <TableRowColumn>{company.total_funding}</TableRowColumn>
                      </TableRow>
                    )
                  })
                  }
                </TableBody>
              </Table>
            </div>)
  }
}

MyCompanies.propTypes = {
  apiData: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
}

