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
      showRowHover: true,
      multiSelectable: true,
      showComparison: false,
      deselectOnClickaway: false,
      selectedCompanies: []
    };

    this.selectedRows = [];
  }

  removeCompany() {

    var selectedCompanies = [];
    if (this.selectedRows === 'all') {
      selectedCompanies = this.props.apiData.comapnies.slice();
    } else {
      for (var i = 0; i < this.selectedRows.length; i++) {
        selectedCompanies.push(this.props.apiData.companies[this.selectedRows[i].toString(10)]);
      }
    }
    for (var i = 0; i < selectedCompanies.length; i++) {
      var company = selectedCompanies[i];
      this.props.removeApiData('/api/company/follow', company.id)
    }
  }

  doSelection(selection) {
    this.selectedRows = selection;
  }

  compareCompanies() {

    var selectedCompanies = [];
    if (this.selectedRows === 'all') {
      selectedCompanies = this.props.apiData.companies.slice();
    } else {
      for (var i = 0; i < this.selectedRows.length; i++) {
        selectedCompanies.push(this.props.apiData.companies[this.selectedRows[i].toString(10)]);
      }
    }
    this.setState({selectedCompanies: selectedCompanies});
    this.setState({showComparison: true});
    setTimeout(function() {
      console.log(this.state)
    }.bind(this), 1);
  }
  
  render () {

    return (<div style={{width: "80%", marginTop: "20px", marginLeft: "auto", marginRight: "auto"}}>
              <Table 
                  fixedHeader={this.state.fixedHeader}
                  multiSelectable={this.state.multiSelectable}
                  onRowSelection={this.doSelection.bind(this)} 
              >
                <TableHeader>
                  <TableRow>
                    <TableHeaderColumn 
                        colSpan="7" 
                        style={{textAlign: 'center'}}
                    ><h1>{'My Companies'}</h1>
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

                <TableBody 
                  deselectOnClickaway={this.state.deselectOnClickaway}
                  showRowHover={this.state.showRowHover}  
                  stripedRows={this.state.stripedRows}
                >
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
                        <TableRowColumn>{company.city ? company.city : ' - '}</TableRowColumn>
                        <TableRowColumn>{company.employees ? company.employees : ' - '}</TableRowColumn>
                        <TableRowColumn>{company.founding_date ? company.founding_date.split('T')[0] : ' - '}</TableRowColumn>
                        <TableRowColumn>{company.stage ? company.stage : ' - '}</TableRowColumn>
                        <TableRowColumn>{company.total_funding ? '$' + company.total_funding : ' - '}</TableRowColumn>
                      </TableRow>
                    )
                  })
                  }
                </TableBody>
              </Table>
              
              <div>
                
                { /* button to compare companies on d3 graph */ }
                <FlatButton 
                    label="Compare" 
                    onClick={this.compareCompanies.bind(this)}
                    primary={true}  
                />

                { /* button to delete a company from table */ }
                <FlatButton
                    label="Delete"
                    onClick={this.removeCompany.bind(this)}
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

