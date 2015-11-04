// URL is /profile
// this view renders a table of companies that the user is following
// its parent is UserProfile

// import dependencies
import React, { PropTypes, Component }  from 'react';
import _                                from 'lodash';
import { RaisedButton,Table, TableHeader, TableRow, TableRowColumn, TableHeaderColumn, TableBody, TableFooter, FlatButton }             from 'material-ui';
import d3                               from 'd3';

// import components
import CompanyVis                       from './CompanyVis';

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

  // method to delete a company from the user's profile
  removeCompany() {

    var selectedCompanies = [];

    // if user selects all the rows
    if (this.selectedRows === 'all') {
      selectedCompanies = this.props.apiData.companies.slice();
    } 
    // otherwise, iterate over the rows they did select
    else {
      for (var i = 0; i < this.selectedRows.length; i++) {
        selectedCompanies.push(this.props.apiData.companies[this.selectedRows[i].toString(10)]);
      }
    }

    // iterate over the rows the user has selected
    for (var i = 0; i < selectedCompanies.length; i++) {
      var company = selectedCompanies[i];

      // DELETE request to remove a company from a user's profile
      this.props.removeApiData('/api/company/follow', company.id)

      // Segment event tracking when user deletes a company
      analytics.track('Remove Company', {
        "Company Name": company.name,
        "Company ID": company.id,
      });
    }

    // update the view by getting the new profile data
    this.props.fetchApiData('/api/user/profile/me');
  }

  doSelection(selection) {
    this.selectedRows = selection;
  }

  // method to compare companies in a user's profile
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

    // Segment event tracking when user compares companies
    for (var i = 0; i < selectedCompanies.length; i++) {
      var company = selectedCompanies[i];
      analytics.track('Compare Company', {
        "Company Name": company.name,
        "Company ID": company.id,
      });
    }
  }
  
  render () {
    return (<div style={{width: "80%", marginTop: "20px", marginLeft: "auto", marginRight: "auto"}}>
              <Table 
                  fixedHeader={this.state.fixedHeader}
                  multiSelectable={this.state.multiSelectable}
                  onRowSelection={this.doSelection.bind(this)} 
              >
                <TableHeader>
                  <TableRow displayBorder={false}>
                    <TableHeaderColumn 
                        colSpan="7" 
                        style={{textAlign: 'center'}}
                    ><h1>{'My Companies'}</h1>
                    </TableHeaderColumn>
                  </TableRow>

                  <TableRow 
                    displayBorder={false}
                  >
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
                      <TableRow displayBorder={false} >
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
                        <TableRowColumn>{company.employees ? d3.format(",")(company.employees) : ' - '}</TableRowColumn>
                        <TableRowColumn>{company.founding_date ? company.founding_date.split('T')[0] : ' - '}</TableRowColumn>
                        <TableRowColumn>{company.stage ? company.stage : ' - '}</TableRowColumn>
                        <TableRowColumn>{company.total_funding ? '$' + d3.format(",")(company.total_funding) : ' - '}</TableRowColumn>
                      </TableRow>
                    )
                  })
                  }
                </TableBody>
              </Table>
              
              <div>
                
                { /* button to compare companies on d3 graph */ }
                <RaisedButton 
                    label="Compare" 
                    onClick={this.compareCompanies.bind(this)}
                    primary={true}
                    style = {{'margin-left': '2%'}}
                />

                { /* button to delete a company from table */ }
                <RaisedButton
                    label="Delete"
                    onClick={this.removeCompany.bind(this)}
                    primary={true}
                    style = {{'margin-left': '2%'}}
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
  fetchApiData: PropTypes.func.isRequired,
  removeApiData: PropTypes.func.isRequired
}

