import React, { PropTypes, Component } from 'react';
//Connect this component to Redux dispatcher and store
import d3 from 'd3';
import {CircularProgress} from 'material-ui';

const industryPath = '/data/company?fields[]=name&fields[]=employees&fields[]=employees_mom&fields[]=total_funding&fields[]=stage&fields[]=founding_date&industry=';

//Import lodash utility functions
import _                                from 'lodash';

export default class IndustryGraph extends Component {

  constructor() {
    super();
    this.state = {industry: ''};
  }

  componentWillReceiveProps(nextProps) {
    //User selected a company in the search box
    if (nextProps.apiData.name){
      var industryNames = _.pluck(nextProps.apiData.Industries, 'name');
      this.setState({companyId: this.props.companyId, industryNames: industryNames, industry: industryNames[0], companyName: nextProps.apiData.name});
      this.props.fetchApiData(industryPath + industryNames[0]);
    } else {
      this.updateVis(this.d3Node, nextProps.apiData);
    }
  }

  componentDidMount() {
    //Generate skeleton of d3 graph
    this.generateVis(this.d3Node);
    //Get the initial data with all industry
    this.props.fetchApiData(industryPath + (this.state.industry || 'all'));
  }

  generateVis(node){
    // Chart dimensions.
      var margin = {top: 19.5, right: 19.5, bottom: 100, left: 39.5},
          width = 960 - margin.right,
          height = 600 - margin.top - margin.bottom;

    // Create the SVG container and set the origin.
    var svg = d3.select(node).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + 0 + "," + margin.top + ")");

    // Add the x-axis.
    var xAxis = d3.svg.axis();
    svg.append("g")
        .attr("class", "x-axis axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the y-axis.
    var yAxis = d3.svg.axis();
    svg.append("g")
        .attr("class", "y-axis axis")
        .call(yAxis);

    // Add an x-axis label.
    svg.append("text")
        .attr("class", "x-label label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 6)
        .text("Log of Total funding ($)");

    // Add a y-axis label.
    svg.append("text")
        .attr("class", "y-label label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Funding per employee ($)");

    // Add the industry label
    var label = svg.append("text")
      .attr("class", "industry-label")
      .attr("text-anchor", "end")
      .attr("y", height - 24)
      .attr("x", width);

    // Add an overlay for the industry label.
    var box = label.node().getBBox();

    var overlay = svg.append("rect")
          .attr("class", "overlay")
          .attr("x", box.x)
          .attr("y", box.y)
          .attr("width", box.width)
          .attr("height", box.height);

    // Add a group for dots
    var dot = svg.append("g")
      .attr("class", "dots");

    // Create tooltip to be hidden
    var tooltip = d3.select(node).append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // Create legend for the graph
    var legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (width - margin.left)/3 + "," + (height + margin.bottom/4) + ")");
  }

  updateVis(node, data) {
    var industry = this.state.industry || 'all';
    var companies = data;
    // Various accessors that specify the four dimensions of data to visualize.
    function x(d) { return d.total_funding; }
    function y(d) { return d.total_funding / d.employees; }
    function radius(d) { return d.employees_mom; }
    function color(d) { return d.employees_mom; }
    function key(d) { return d.name; }

    // Chart dimensions.
    var margin = {top: 19.5, right: 19.5, bottom: 100, left: 39.5},
        width = 960 - margin.right,
        height = 600 - margin.top - margin.bottom;

    //Clean data
    companies = cleanData(companies);
    // companies = chauvenet(companies, x);
    // companies = chauvenet(companies, y);
    // companies = chauvenet(companies, radius);
    //x
    var max_x = d3.max(companies, x);
    var min_x = d3.min(companies, x);
    //y
    var max_y = d3.max(companies, y);
    var min_y = d3.min(companies, y);
    //r
    var max_r = d3.max(companies, radius);
    var min_r = d3.min(companies, radius);

    // Various scales. These domains make assumptions of data, naturally.
    var xScale = d3.scale.log().domain([min_x, max_x]).range([0, width]),
        yScale = d3.scale.linear().domain([min_y, max_y]).range([height, 0]),
        radiusScale = d3.scale.sqrt().domain([min_r,max_r]).range([0, 40]),
        colorScale = d3.scale.category20();

    var tooltipTemplate = '<div class="tooltipTitle"><%= name %> <%= year %></div>\
                            <div class="tooltipLine">\
                                <span class="tooltipMetricName">Total Funding</span>\
                                <span class="tooltipMetricValue"><%= total_funding %></span>\
                            </div>\
                            <div class="tooltipLine">\
                                <span class="tooltipMetricName">Employees</span>\
                                <span class="tooltipMetricValue"><%= employees %></span>\
                            </div>\
                            <div class="tooltipLine">\
                                <span class="tooltipMetricName">Employees Growth Rate</span>\
                                <span class="tooltipMetricValue"><%= employees_mom %></span>\
                            </div>\
                            <div class="tooltipLine">\
                                <span class="tooltipMetricName">Funding per Employee</span>\
                                <span class="tooltipMetricValue"><%= fund_per_emp %></span>\
                            </div>\
                           </div>';
    var cleanTemplateData = function(c){
      var d = {};
      var integer = d3.format(',f');
      var percent = d3.format('%');
      d.name = c.name;
      d.total_funding = integer(c.total_funding);
      d.employees = integer(c.employees);
      d.employees_mom = percent(c.employees_mom);
      d.year = c.founding_date ? " (" +(new Date(c.founding_date)).getFullYear() + ")": "";
      d.fund_per_emp = integer(c.total_funding/c.employees);
      return d;
    };

    var colors = ["rgb(247, 251, 255)", "rgb(198, 219, 239)", "rgb(107, 174, 214)", "rgb(33, 113, 181)", "rgb(8, 48, 107)"];

    var dataValues = companies.slice().sort(function(a,b){return color(a) - color(b);}).map(function(d){return color(d);});
    var q0 = d3.quantile(dataValues,0);
    var q1 = d3.quantile(dataValues,0.2);
    var q2 = d3.quantile(dataValues,0.4);
    var q3 = d3.quantile(dataValues,0.6);
    var q4 = d3.quantile(dataValues,0.8);

    var colorScale = d3.scale.threshold()
        .domain([q0,q1,q2,q3,q4])
        .range([0].concat(colors));

    // The x & y axes.
    var xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(6, d3.format("s"))
                  .innerTickSize(-height)
                  .outerTickSize(0)
                  .tickPadding(10),

        yAxis = d3.svg.axis().scale(yScale).orient("left")
                  .innerTickSize(-width)
                  .outerTickSize(0)
                  .tickPadding(10);

    var svg = d3.select(node).selectAll('svg');

    // Update the x-axis.
    svg.selectAll(".x-axis")
      .transition()
      .duration(500)
      .call(xAxis);

    // Update the y-axis.
    svg.selectAll(".y-axis")
      .transition()
      .duration(500)
      .call(yAxis);

    // Update the industry label
    var label = svg.selectAll('.industry-label')
      .text(industry);

    // var gridSize = 50;
    // var legendElementWidth = 60;

    // var blocks = legend.selectAll(".block")
    //   .data(colorScale.domain(), function(d) { return d; })
    //   .enter().append("g").attr("class","block");

    //   blocks.append("rect")
    //   .attr("class","scale")
    //   .attr("x", function(d, i) { return legendElementWidth * i; })
    //   .attr("y", 0)
    //   .attr("width", legendElementWidth)
    //   .attr("height", gridSize / 2)
    //   .style("fill", function(d, i) { return colors[i]; });
      
    //   blocks.append("text")
    //   .attr("class", "mono")
    //   .text(function(d) { return "> " + d*100 + "%"; })
    //   .attr("x", function(d, i) { return legendElementWidth/4 + legendElementWidth * i; })
    //   .attr("y", 3/4*gridSize);

    // Select tooltip
    var tooltip = d3.select(node).selectAll(".tooltip");

    // A bisector since many nation's data is sparsely-defined.
    var bisect = d3.bisector(function(d) { return d[0]; });

    var dots = svg.selectAll(".dots");
    // Update dot groups
    var dot = dots.selectAll(".dot")
        .data(companies, function(d) {return d.name})

      dot
        .transition()
        .duration(1000)
        .call(position).style("fill", function(d) {
            if (d.name === this.state.companyName){
              return 'red';
            } else {
              return colorScale(color(d));
            } 
          }.bind(this));

      dot.enter().append("circle")
        .attr("class", "dot")
        .style("fill", function(d) {
          if (d.name === this.state.companyName){
            return 'red';
          } else {
            return colorScale(color(d));
          } 
        }.bind(this))
        .style("opacity", 0.75)
        .call(position)
        .sort(order)
        .on("mouseover", function(d) {
            var compiled = _.template(tooltipTemplate);
            tooltip.transition()
                 .duration(200)
                 .style("opacity", .9);
            tooltip.html(compiled(cleanTemplateData(d)))
                 .style("left", (d3.event.pageX + 5) + "px")
                 .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                 .duration(500)
                 .style("opacity", 0);
        });

      dot.exit()
        .transition()
        .duration(1000)
        .style("fill-opacity", 1e-6)
        .remove();

    // Positions the dots based on data.
    function position(dot) {
      dot .transition().duration(1000)
          .attr("cx", function(d) { return xScale(x(d)); })
          .attr("cy", function(d) { return yScale(y(d)); })
          .attr("r", function(d) { return radiusScale(radius(d))/4; });
    }

    // Defines a sort order so that the smallest dots are drawn on top.
    function order(a, b) {
      return radius(b) - radius(a);
    }

    // Clean data
    function cleanData(companies) {
      return companies.filter(function(d) {
        return (!isNaN(parseFloat(d.employees)) && !isNaN(parseFloat(d.employees_mom)) && !isNaN(parseFloat(d.total_funding)) && (parseFloat(d.total_funding) > 0) && (d.employees > 20) && (d.total_funding > 1000000) && (d.stage.toLowerCase().indexOf("exit") < 0));
      });
    }

    // Remove outliers
    function chauvenet(data, f) {
      var dMax = 3;
      var mean = d3.mean(data,f);
      var stdv = Math.sqrt(d3.variance(data,f));

      return data.filter(function(d){
        return (dMax > (Math.abs(f(d) - mean))/stdv);
      });
    }
  }

  render() {
    return (
      <div className="vis">
        <div ref={(node) => this.d3Node = node} >
        </div>  
      </div>  
    )
  }

};
