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

  generateVis(node) {
    var lv = this.refs.minVal.getValue(),
        hv = this.refs.maxVal.getValue(),
        le = this.refs.minEq.getValue() / 100,
        he = this.refs.maxEq.getValue() / 100;
        

    var data = [
      {
        outcome: 'Min Val/Min Eq',
        value: lv * le 
      },
      {
        outcome: 'Min Val/Max Eq',
        value: lv * he
      },
      {
        outcome: 'Max Val/Min Eq',
        value: hv * le
      },
      {
        outcome: 'Max Val/Max Eq',
        value: hv * he
      }
    ];

    var margin = {top: 20, right: 100, bottom: 30, left: 10},
      width = 1000 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], 0.2);

    var y = d3.scale.linear()
      .range([height, 0]);

    var color = d3.scale.category10();

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    var svg = d3.select(node)
      .append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function(d) { return d.outcome; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Option value at exit");

    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.outcome); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });
    
    


  }

  updateVis() {}

  render() {
    var divStyle = {width: "1100px", height: "700px", marginBottom: "50px", marginLeft: "auto", marginRight: "auto"};

    return (
          <div style={divStyle}>
            <div>
              <TextField 
                style={{margin: "10px"}}
                hintText="Min Valuation" 
                floatingLabelText="Min Valuation" 
                value={1000000} 
                ref="minVal"
              />
              <TextField 
                style={{margin: "10px"}}
                hintText="Min Equity Percentage" 
                floatingLabelText="Min Equity Percentage"
                value={0.001}
                ref="minEq"
              />
            </div>
            <div>
              <TextField 
                style={{margin: "10px"}}
                hintText="Max Valuation" 
                floatingLabelText="Max Valuation"
                value={10000000}
                ref="maxVal"
              />
              <TextField 
                hintText="Max Equity Percentage"
                style={{margin: "10px"}}
                floatingLabelText="Max Equity Percentage"
                value={.5}
                ref="maxEq"
              />
              <FlatButton 
                label="Recalculate" 
              />
            </div> 
                
            <div className="vis offer"
                style={{marginTop: "50px"}}
                ref={(node) => this.d3Node = node}
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
