import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import {CircularProgress} from 'material-ui';

export default class CompanyVis extends Component {

  constructor() {
    super();
    this.state = {
      isD3ready: false,
    };
    this.displayName = 'CompanyVis';
  }

  componentDidMount() {
    this.generateVis(this.d3Node, this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    this.updateVis(this.d3Node, nextProps.data);
  }

  removeSpinner() {
    this.setState({isD3ready: true});
  }

  updateVis(node, data) {
    console.log('newdata: ', data);

    var margin = {top: 20, right: 100, bottom: 30, left: 10},
      width = 1600 - margin.left - margin.right,
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
      .orient("left")
      .tickFormat(d3.format("s")); 

    var xRange = data.length > 1 ? d3.extent(data, function(d) {return d.total_funding}) : [0, data[0].total_funding + 1000];
    var yRange = data.length > 1 ? d3.extent(data, function(d) {return d.employees}) : [0, data[0].employees + 50];

    x.domain(xRange).nice();
    y.domain(yRange).nice();

    var svg = d3.select(node).selectAll('svg');

    svg.selectAll('.x')
      .transition()
      .duration(1000)
      .call(xAxis);

    svg.selectAll('.y')
      .transition()
      .duration(1000)
      .call(yAxis);

    
    var points = svg.selectAll(".dot")
      .data(data, function(d) {return d.id;});

    points.transition()
      .duration(1000)
      .attr("cx", function(d) { return x(d.total_funding); })
      .attr("cy", function(d) { return y(d.employees); });

    points.enter().append('circle')
      .attr("class", "dot")
      .attr("r", 6.5)
      .attr("cx", -10)
      .attr("cy", -10)
      .style("fill-opacity", 1e-6)
      .transition()
      .duration(1000)
      .attr("cx", function(d) { return x(d.total_funding); })
      .attr("cy", function(d) { return y(d.employees); })
      .style("fill-opacity", 1)
      .style("fill", function(d) { return color(d.stage); })
      
    points.exit()
      .transition()
      .duration(1000)
      .style("fill-opacity", 1e-6)
      .remove();
  }

  generateVis(node, data) {
    
    this.removeSpinner();

    console.log('data: ', data);
    
    var margin = {top: 20, right: 100, bottom: 30, left: 10},
      width = 1600 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var x = d3.scale.linear()
      .range([0, width]);

    var y = d3.scale.linear()
      .range([height, 0]);

    var color = d3.scale.category10();

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickFormat(d3.format("s"));

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    var svg = d3.select(node)
      .append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // In case there's only one datapoint, we need to set the domain manually so
    // that the axes don't collapse
    var xRange = data.length > 1 ? d3.extent(data, function(d) {return d.total_funding}) : [0, data[0].total_funding + 1000];
    var yRange = data.length > 1 ? d3.extent(data, function(d) {return d.employees}) : [0, data[0].employees + 50];

    x.domain(xRange).nice();
    y.domain(yRange).nice();

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
      .text("Total employees");

    svg.selectAll(".dot")
      .data(data, function(d) {return d.id;})
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 6.5)
      .attr("cx", function(d) { return x(d.total_funding); })
      .attr("cy", function(d) { return y(d.employees); })
      .style("fill", function(d) { return color(d.stage); })
      .append("title")
      .text(function(d) {return d.name;});

      
      
  }

  render() {
    var divStyle = {width: "1600px"};

    return (
        <div className="vis"
            ref={(node) => this.d3Node = node}
            style={divStyle}
        >
          <div>
            {!this.state.isD3ready ? <CircularProgress mode="indeterminate" size={1.5} /> : ''}
          </div>  
        </div>  
    )
  }
}

CompanyVis.propTypes = {
  data: PropTypes.array.isRequired
}


