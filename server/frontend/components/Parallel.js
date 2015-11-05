import React, { PropTypes, Component }  from 'react';
import ReactDOM                         from 'react-dom';
import d3                               from 'd3';
import * as parcoords                   from './lib/d3.parcoords.js';

import {CircularProgress}               from 'material-ui';

export default class Parallel extends Component {
  constructor() {
    super();
    this.state = {dataLoaded: false}
  }

  componentDidMount() {
    this.doD3(this.d3Node);
  }

  summarize(apiData) {
    var intermediate = {};

    // this code is to sift through the data, which comes in by company, and
    // compute summary data for industries. We loop through every company, then
    // keep track of industry counts in an object, from which we compute the means
    // at the end
    for (var i = 0; i < apiData.length; i++) {
      var company = apiData[i];
      var industries = company.Industries;
      for (var j = 0; j < industries.length; j++) {
        intermediate[industries[j].name] = intermediate[industries[j].name] || {
          industryCount: 0,
          employees_mom: {count:0, sum: 0}, 
          employees: {count:0, sum: 0}, 
          total_funding: {count: 0, sum: 0}
        };
        var industry = intermediate[industries[j].name];
        industry.industryCount++;
        if (company['employees_mom'] !== null) {
          var emom = company['employees_mom'];
          industry['employees_mom'].count++;
          industry['employees_mom'].sum += emom;
        }
        if (company['employees'] !== null) {
          var emp = company['employees'];
          industry['employees'].count++;
          industry['employees'].sum += emp;
        }
        if (company['total_funding'] !== null) {
          var funding = company['total_funding'];
          industry['total_funding'].count++;
          industry['total_funding'].sum += funding;
        }
        
      }
    }
    
    var out = [];
    for (var industry in intermediate) {
      var summary = {};
      summary['Industry'] = industry;
      summary['Companies'] = intermediate[industry]['industryCount'];
      summary['Funding'] = intermediate[industry]['total_funding'].sum / intermediate[industry]['total_funding'].count;
      summary['Employees_MoM'] = intermediate[industry]['employees_mom'].sum / intermediate[industry]['employees_mom'].count;
      summary['Employees'] = intermediate[industry]['employees'].sum / intermediate[industry]['employees'].count;      
      out.push(summary);
    }
    return out;
  }

  doD3(d3Node) {

    console.log('node: ', d3Node);
        
    d3.json('/data/company?industry=all&fields[]=employees_mom&fields[]=employees&fields[]=total_funding', function(data) {
     
      this.setState({dataLoaded: true});  
        
      var colorgen = d3.scale.ordinal()
        .range(["#a6cee3","#1f78b4","#b2df8a","#33a02c",
            "#fb9a99","#e31a1c","#fdbf6f","#ff7f00",
            "#cab2d6","#6a3d9a","#ffff99","#b15928"]);
      
      var summaryData = this.summarize(data);

      var color = function(d) { return colorgen(d.Industry); };

      var parcoords = d3.parcoords()(d3Node)
        .data(summaryData)
        //.hideAxis(["name"])
        .color(color)
        .alpha(0.35)
        .composite("darken")
        .margin({ top: 24, left: 100, bottom: 12, right: 50 })
        .mode("queue")
        .render()
        .brushMode("1D-axes")
        .reorderable();  

      parcoords.svg.selectAll("text")
        .style("font", "8px");
      
    }.bind(this));
  }

  render() {
    var divStyle = {width: "1300px", height: "950px", margin: "auto"};

    return (
      <div>
        
        <div 
            className="parcoords" 
            ref={(node) => this.d3Node = node} 
            style={divStyle}
        >
          <div>
            {!this.state.dataLoaded ? 
            <CircularProgress 
                mode="indeterminate" 
                size={1.5} 
                style={{'display': 'block', 'margin': 'auto', 'marginTop' : '10%'}}
            /> : ''}
           </div> 
         </div> 
      </div>  
      
    )
  }
}
