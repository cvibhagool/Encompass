// this file is a subview of a user's companies that they follow
// its parent is UserProfile.js

// import dependencies
import React, { PropTypes, Component } from 'react';
import _                               from 'lodash';
import { Table, TableHeader, TableRow, TableRowColumn, TableHeaderColumn, TableBody, TableFooter, FlatButton } from 'material-ui';

import CompanyVis from './CompanyVis';

export default class MyCompanies extends Component {
  constructor () {
    super();

    // sets the state for our table settings (material-ui)
    this.state = {
      fixedHeader: true,
      stripedRows: true,
      showRowHover: false,
      multiSelectable: true,
      showComparison: false,
      selectedCompanies: []
    };
    this.displayName = 'MyCompanies';
    this.selectedRows = [];
  }

  clickRemoveCompany(e) {
    e.preventDefault();
    this.props.removeApiData('/api/company/', id)
  }

  //selectedCompanies: []

  doSelection(selection) {
    this.selectedRows = selection;
    //console.log(this.selectedRows);
  }

  compareCompanies() {

    var selectedCompanies = [];
    if (this.selectedRows === 'all') {
      console.log('all');
    } else {
      for (var i = 0; i < this.selectedRows.length; i++) {
        selectedCompanies.push(this.props.apiData.companies[this.selectedRows[i].toString(10)]);
      }
    }
    //this.selectedCompanies = selectedCompanies;
    this.setState({selectedCompanies: selectedCompanies});
    this.setState({showComparison: true});
    setTimeout(function() {
      console.log(this.state)
    }.bind(this), 1);
  }
  
  render () {
    return (<div>
              <Table 
                  fixedHeader={this.state.fixedHeader}
                  multiSelectable={this.state.multiSelectable}
                  onRowSelection={this.doSelection.bind(this)} 
              >
                <TableHeader>
                  <TableRow>
                    <TableHeaderColumn 
                        colSpan="8" 
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
                    <TableHeaderColumn>{'Remove?'}</TableHeaderColumn>
                  </TableRow>
                </TableHeader>

                <TableBody stripedRows={this.state.stripedRows}>
                  {_.map(this.props.apiData.companies, function(company) {
                    return (
                      <TableRow >
                        <TableRowColumn>{company.name}</TableRowColumn>
                        <TableRowColumn>
                          <a 
                              href={'http://www.' + company.website} 
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

                        { /* this is not working; trying to remove list item upon clicking X */ }
                        <TableRowColumn onClick={this.clickRemoveCompany.bind(this)}><a href='#'>{'X'}</a></TableRowColumn>

                      </TableRow>
                    )
                  }.bind(this))
                  }
                </TableBody>
              </Table>
              <div>
              <FlatButton 
                  label="Compare" 
                  onClick={this.compareCompanies.bind(this)}
                  primary={true}  
              />
              </div>
              <div>
                {this.state.showComparison ? <CompanyVis data={this.state.selectedCompanies} /> : ''}
              </div>  
            </div>)
  }
}

MyCompanies.propTypes = {
  apiData: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  removeApiData: PropTypes.func.isRequired
}

