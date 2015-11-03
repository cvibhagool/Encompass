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
  }

  componentWillReceiveProps(nextProps) {
    // reset the text fields
    this.refs.maxEq.setValue(nextProps.data.equity);
    this.refs.minEq.setValue(0.001);
    this.refs.maxVal.setValue(10000000);
    this.refs.minVal.setValue(1000000);

    this.updateVis();
  }

  roundData(data) {
    var d = {};
    d.outcome = data.outcome;
    d.value = Math.round(data.value);
    return d;
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

    var tooltip = d3.select(node).append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var tooltipTemplate = '<div class="tooltipTitle">\
                              <div class="tooltipLine">\
                                  <span class="tooltipMetricName">Outcome</span>\
                                  <span class="tooltipMetricValue"><%= outcome %></span>\
                              </div>\
                              <div class="tooltipLine">\
                                  <span class="tooltipMetricName">Value</span>\
                                  <span class="tooltipMetricValue">$<%= value %></span>\
                              </div>\
                             </div>';

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
      .text("Option value at exit (USD)");

    svg.selectAll(".bar")
      .data(data, function(d) { return d.outcome; })
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.outcome); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .on("mouseover", function(d) {
              var compiled = _.template(tooltipTemplate);
              tooltip.transition()
                   .duration(200)
                   .style("opacity", .9);
              //console.log('temp :', this.tooltipTemplate);
              tooltip.html(compiled(this.roundData(d)))
                   .style("left", (d3.event.pageX + 15) + "px")
                   .style("top", (d3.event.pageY - 28) + "px");
          }.bind(this))
          .on("mouseout", function(d) {
              tooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
       });
      

  }

  updateVis() {
    var node = this.d3Node;

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

    var y = d3.scale.linear()
      .range([height, 0]);

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");
  
    var svg = d3.select(node).selectAll('svg');

    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    svg.selectAll('.y')
      .transition()
      .duration(1000)
      .call(yAxis);

    var bars = svg.selectAll(".bar")
      .data(data, function(d) {return d.outcome;});

    bars.transition()
      .duration(1000)
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });
  }

  render() {
    var divStyle = {width: "1100px", height: "700px", marginBottom: "50px", marginLeft: "auto", marginRight: "auto"};

    return (
          <div style={divStyle}>
            <div>
              <TextField 
                defaultValue={1000000} 
                floatingLabelText="Min Valuation" 
                hintText="Min Valuation" 
                ref="minVal"
                style={{margin: "10px"}}
              />
              <TextField 
                defaultValue={0.001}
                floatingLabelText="Min Equity Percentage"
                hintText="Min Equity Percentage" 
                ref="minEq"
                style={{margin: "10px"}}
              />
            </div>
            <div>
              <TextField 
                defaultValue={10000000}
                floatingLabelText="Max Valuation"
                hintText="Max Valuation" 
                ref="maxVal"
                style={{margin: "10px"}}
              />
              <TextField 
                defaultValue={this.props.data.equity}
                floatingLabelText="Max Equity Percentage"
                hintText="Max Equity Percentage"
                ref="maxEq"
                style={{margin: "10px"}}
              />
              <FlatButton 
                label="Recalculate" 
                onClick={this.updateVis.bind(this)}
              />
            </div> 
                
            <div className="vis offer"
                ref={(node) => this.d3Node = node}
                style={{marginTop: "50px"}}
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
