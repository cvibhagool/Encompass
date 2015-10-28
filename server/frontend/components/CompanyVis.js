import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import {CircularProgress} from 'material-ui';

export default class CompanyVis extends Component {

  displayName: 'CompanyVis'

  constructor() {
    super();
    this.state = {dataLoaded: false}
  }

  componentDidMount() {
    this.generateVis(this.d3Node, this.props.data);
  }


  generateVis(node, data) {

    this.setState({dataLoaded: true});

    console.log('data: ', data);
    console.log('node: ', node);


    var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var x = d3.scale.linear()
      .range([0, width]);

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

    x.domain([0, data[0].total_funding + 1000]).nice();
    y.domain([-10, 100]).nice();

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Total funding (USD)");

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Employees added month-over-month (%)");

    svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", function(d) { return x(d.total_funding); })
      .attr("cy", function(d) { return y(d.employees_mom); })
      .style("fill", function(d) { return color(d.stage); });

      
      
  }

  render() {
    var divStyle = {width: "1600px", height: "900px"};

    return (
        <div 
          ref={(node) => this.d3Node = node}
          style={divStyle}>
          {!this.state.dataLoaded ? <CircularProgress mode="indeterminate" size={1.5} /> : ''}
        </div>  
    )
  }
}


