import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import _ from 'lodash';
import {TextField, ClearFix} from 'material-ui';

export default class OfferVis extends Component {
  displayName: 'CompanyVis';
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.generateVis(this.d3Node, this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    this.updateVis(this.d3Node, nextProps.data);
  }

  sliderMove(e, val) {
    console.log('slider: ', val);
  }

  generateVis() {}

  updateVis() {}

  render() {
    var divStyle = {width: "1600px"};

    return (
        <div style={divStyle}>
          <div >
            <TextField hintText="Min Valuation" /><TextField hintText="Max Valuation" />
          </div>
          <div className="vis"
              ref={(node) => this.d3Node = node}
              style={divStyle}
          ></div>
          
        </div>

    )
  }
};

