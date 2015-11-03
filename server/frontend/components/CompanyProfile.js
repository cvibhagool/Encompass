import React, { PropTypes, Component } from 'react';
import _                                from 'lodash';
import { Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn } from 'material-ui';
export default class CompanyProfile extends Component {

  constructor () {
    super();

    //Adds display name for debugging purposes
    this.displayName = 'CompanyProfile';
    this.state = {};
  }

  componentWillMount() {
    this.props.fetchApiData('/api/company/' + this.props.companyId);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.companyId !== nextProps.companyId)
      this.props.fetchApiData('/api/company/' + nextProps.companyId);
  }

  render() {
    const { apiData } = this.props;
    return (
      <div>

      {apiData.employees &&
        <Table>
          <TableHeader 
              adjustForCheckbox={false} 
              displaySelectAll={false}
          > 
            <TableRow>
              <TableHeaderColumn 
                  colSpan={2} 
                  key='name'
                  style={{textAlign: 'center'}}
              > 
                <h2>{apiData.name}</h2> 
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
                <TableRowColumn>{'Company Website'}</TableRowColumn> <TableRowColumn key='website'>{apiData.website}</TableRowColumn>
            </TableRow>
            <TableRow>
                <TableRowColumn>{'Total Employees'}</TableRowColumn> <TableRowColumn key='employees'>{apiData.employees ? apiData.employees.toLocaleString() : <i>{'No total employees on record'}</i>}</TableRowColumn>
            </TableRow>
            <TableRow>    
                <TableRowColumn>{'Founding Date'}</TableRowColumn> <TableRowColumn key='founding_date'>{apiData.founding_date ? apiData.founding_date.split('T')[0] : <i>{'No date on record'}</i>}</TableRowColumn>
            </TableRow>
            <TableRow> 
                <TableRowColumn>{'Company Stage'}</TableRowColumn> <TableRowColumn key='stage'>{apiData.stage}</TableRowColumn>
            </TableRow>
            <TableRow>    
                <TableRowColumn>{'Total Funding (USD)'}</TableRowColumn> <TableRowColumn key='total_funding'>{'$'}{apiData.total_funding ? apiData.total_funding.toLocaleString() : <i>{'No total funding on record'}</i>}</TableRowColumn>
            </TableRow>
            <TableRow>    
                <TableRowColumn>{'Last Funding Date'}</TableRowColumn> <TableRowColumn key='last_funding_date'>{apiData.last_funding_date ? apiData.last_funding_date.split('T')[0] : <i>{'No date on record'}</i>}</TableRowColumn>
            </TableRow>
            <TableRow>    
                <TableRowColumn>{'City'}</TableRowColumn> <TableRowColumn key='city'>{apiData.city}</TableRowColumn>
            </TableRow>
            <TableRow>    
                <TableRowColumn>{'State'}</TableRowColumn> <TableRowColumn key='state'>{apiData.state}</TableRowColumn>
            </TableRow>
            <TableRow>    
                <TableRowColumn>{'Country'}</TableRowColumn> <TableRowColumn key='country'>{apiData.country}</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
        
      }
      </div>
    )
  }
};

CompanyProfile.propTypes = {
  apiData: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  companyId: PropTypes.number.isRequired,
  fetchApiData: PropTypes.func.isRequired
}
