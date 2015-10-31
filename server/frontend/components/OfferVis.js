import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import _ from 'lodash';
import {TextField, FlatButton} from 'material-ui';

export default class OfferVis extends Component {
  
  constructor() {
    super();
    this.state = {};
    this.displayName = 'CompanyVis';
  }

  componentDidMount() {
    this.generateVis(this.d3Node);
    console.log('max: ', this.refs.maxVal.getValue());
  }

  componentWillReceiveProps(nextProps) {
    this.updateVis(this.d3Node, nextProps.data);
  }

  generateVis(node) {}

  updateVis() {}

  render() {
    var divStyle = {width: "1300px", height: "1300px", margin: "20px"};

    return (
          <div style={divStyle}>
            <div >
              <TextField 
                hintText="Min Valuation" 
                floatingLabelText="Min Valuation" 
                value={23} 
                ref="minVal"
              />
              <TextField 
                hintText="Min Equity Percentage" 
                floatingLabelText="Min Equity Percentage"
                value={0.001}
                ref="minEq"
              />
            </div>
            <div>
              <TextField 
                hintText="Max Valuation" 
                floatingLabelText="Max Valuation"
                value={10000000}
                ref="maxVal"
              />
              <TextField 
                hintText="Max Equity Percentage" 
                floatingLabelText="Max Equity Percentage"
                value={.5}
                ref="maxEq"
              />
            </div>  
                
            <div className="vis"
                ref={(node) => this.d3Node = node}
                style={divStyle}
            ></div>
          </div>
    )
  }
};

OfferVis.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
}
